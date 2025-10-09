#!/usr/bin/env python3
"""
Home-baked algorithm generator + saver (zero dependencies)

- Evolves small programs built from primitives (compare-swap, rotate, reverse)
  to sort small arrays.
- When a good program is discovered, asks user permission to write a new Python
  file that implements the discovered algorithm as `apply_program(arr)`.
- Dynamically imports the created file and runs a quick verification.

Usage:
    python generator.py
"""

import random, copy, time, importlib.util, os, sys

random.seed(1)

# ---------------- primitives (same as evolution environment) ----------------
def compare_swap(arr, i, j):
    if i < 0 or j < 0 or i >= len(arr) or j >= len(arr):
        return False
    if arr[i] > arr[j]:
        arr[i], arr[j] = arr[j], arr[i]
        return True
    return False

def rotate_left(arr):
    if len(arr) <= 1: return False
    first = arr.pop(0)
    arr.append(first)
    return True

def rotate_right(arr):
    if len(arr) <= 1: return False
    last = arr.pop()
    arr.insert(0, last)
    return True

def reverse_arr(arr):
    if len(arr) <= 1: return False
    arr.reverse()
    return True

PRIMITIVES = [
    ("CS", lambda arr, params: compare_swap(arr, params[0], params[1])),
    ("RL", lambda arr, params: rotate_left(arr)),
    ("RR", lambda arr, params: rotate_right(arr)),
    ("RV", lambda arr, params: reverse_arr(arr)),
]

def instr_to_str(instr):
    op, params = instr
    if op == "CS":
        return f"CS({params[0]},{params[1]})"
    return op

def run_program(program, arr, max_passes=4):
    arr = list(arr)
    changed = False
    for _ in range(max_passes):
        local_changed = False
        for instr in program:
            op, params = instr
            res = dict(PRIMITIVES)[op](arr, params)
            if res:
                local_changed = True
                changed = True
        if not local_changed:
            break
    return arr, changed

def is_sorted(arr):
    return all(arr[i] <= arr[i+1] for i in range(len(arr)-1))

# ---------------- small evolver (genetic / hillclimb) ----------------
def bubble_pass(n):
    return [("CS", (i, i+1)) for i in range(n-1)]

def linear_scan_swap(n):
    prog = []
    for i in range(n-1):
        prog.append(("CS", (0, n-1-i)))
        prog.append(("RL", ()))
    return prog

def random_instr(n):
    op, _ = random.choice(PRIMITIVES)
    if op == "CS":
        i = random.randrange(0, n)
        j = random.randrange(0, n)
        return (op, (i, j))
    else:
        return (op, ())

def random_program(n, length=6):
    return [random_instr(n) for _ in range(length)]

def mutate_program(program, n, p_mut=0.3):
    new = copy.deepcopy(program)
    for i in range(len(new)):
        if random.random() < p_mut:
            if random.random() < 0.6:
                new[i] = random_instr(n)
            else:
                op, params = new[i]
                if op == "CS":
                    a, b = params
                    a = max(0, min(n-1, a + random.choice([-1,0,1])))
                    b = max(0, min(n-1, b + random.choice([-1,0,1])))
                    new[i] = ("CS", (a,b))
    if random.random() < 0.15 and len(new) < 12:
        new.append(random_instr(n))
    if random.random() < 0.1 and len(new) > 1:
        new.pop(random.randrange(len(new)))
    return new

def crossover(a, b):
    if not a or not b: return copy.deepcopy(a if a else b)
    i = random.randrange(len(a))
    j = random.randrange(len(b))
    return a[:i] + b[j:]

def fitness(program, examples):
    score = 0
    for ex in examples:
        out, _ = run_program(program, ex)
        if is_sorted(out):
            score += 1
    return score / len(examples)

def generate_examples(n, count=20):
    examples = []
    for _ in range(count):
        arr = list(range(n))
        random.shuffle(arr)
        examples.append(arr)
    return examples

def show_program(prog):
    return " | ".join(instr_to_str(i) for i in prog)

def evolve(n, examples, generations=200, pop_size=50):
    pop = []
    pop.append(bubble_pass(n))
    pop.append(bubble_pass(n)*2)
    pop.append(linear_scan_swap(n))
    for _ in range(pop_size - len(pop)):
        pop.append(random_program(n, length=random.randint(3,8)))
    best_prog = None
    best_score = -1
    history = []
    for gen in range(generations):
        scored = [(fitness(p, examples), p) for p in pop]
        scored.sort(key=lambda x: x[0], reverse=True)
        topk = [p for _, p in scored[:max(2, pop_size//5)]]
        if scored[0][0] > best_score:
            best_score = scored[0][0]
            best_prog = copy.deepcopy(scored[0][1])
        history.append(best_score)
        if best_score == 1.0:
            break
        newpop = []
        newpop.extend(topk[:2])
        while len(newpop) < pop_size:
            if random.random() < 0.25:
                a, b = random.sample(topk, 2)
                child = crossover(a, b)
            else:
                parent = random.choice(topk)
                child = mutate_program(parent, n)
            newpop.append(child)
        pop = newpop
    return best_prog, best_score, history

# ---------------- file creation and dynamic import ----------------
def generate_module_source(program, module_name="generated_algo", docstring=None):
    """
    Create a Python source string that implements:
      - primitives (compare_swap, rotate_left, rotate_right, reverse_arr)
      - apply_program(arr): executes the discovered program (with same pass rules)
    """
    header = f'"""\nAuto-generated algorithm module: {module_name}\nDo not edit unless you know what you are doing.\n"""\n\n'
    if docstring:
        header += f"#: {docstring}\n\n"
    primitives_src = '''
def compare_swap(arr, i, j):
    if i < 0 or j < 0 or i >= len(arr) or j >= len(arr):
        return False
    if arr[i] > arr[j]:
        arr[i], arr[j] = arr[j], arr[i]
        return True
    return False

def rotate_left(arr):
    if len(arr) <= 1: return False
    first = arr.pop(0)
    arr.append(first)
    return True

def rotate_right(arr):
    if len(arr) <= 1: return False
    last = arr.pop()
    arr.insert(0, last)
    return True

def reverse_arr(arr):
    if len(arr) <= 1: return False
    arr.reverse()
    return True
'''
    # build program body
    body_lines = []
    body_lines.append("def apply_program(arr, max_passes=4):")
    body_lines.append("    \"\"\"Apply the discovered program to a list (in-place on a copy); returns transformed list.\"\"\"")
    body_lines.append("    a = list(arr)")
    body_lines.append("    for _ in range(max_passes):")
    body_lines.append("        local_changed = False")
    for instr in program:
        op, params = instr
        if op == "CS":
            i, j = params
            body_lines.append(f"        if compare_swap(a, {i}, {j}):")
            body_lines.append("            local_changed = True")
        elif op == "RL":
            body_lines.append("        if rotate_left(a):")
            body_lines.append("            local_changed = True")
        elif op == "RR":
            body_lines.append("        if rotate_right(a):")
            body_lines.append("            local_changed = True")
        elif op == "RV":
            body_lines.append("        if reverse_arr(a):")
            body_lines.append("            local_changed = True")
    body_lines.append("        if not local_changed:")
    body_lines.append("            break")
    body_lines.append("    return a")
    body = "\n".join("    " + line if idx>0 and line and not line.startswith("def") else line for idx,line in enumerate(body_lines))
    return header + primitives_src + "\n\n" + body + "\n"

def write_module_file(path, source):
    with open(path, "w", encoding="utf-8") as f:
        f.write(source)

def import_module_from_path(path, module_name):
    spec = importlib.util.spec_from_file_location(module_name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

# ---------------- main flow ----------------
def main():
    print("=== Home-baked algorithm generator ===")
    n = 4
    examples_count = 80
    print(f"Training (evolving) to sort arrays of length {n} using {examples_count} examples...")
    examples = generate_examples(n, examples_count)
    t0 = time.time()
    program, score, history = evolve(n, examples, generations=400, pop_size=120)
    t1 = time.time()
    print(f"Evolution done. Time: {t1-t0:.2f}s  Best score: {score:.3f}")
    print("Discovered program:")
    print(show_program(program))
    # show some tests
    tests = [[3,1,0,2], [2,3,1,0], [0,2,1,3]]
    print("\nQuick tests (using local interpreter):")
    for t in tests:
        out, _ = run_program(program, t)
        print(f"{t} -> {out}  sorted={is_sorted(out)}")
    # Ask permission to create module
    while True:
        ans = input("\nCreate a Python file implementing this algorithm? [y/n]: ").strip().lower()
        if ans in ("y","n"):
            break
    if ans == "n":
        print("Aborted: not creating file.")
        return
    # ask filename
    default_name = "generated_algo.py"
    filename = input(f"Enter filename to write (default '{default_name}'): ").strip()
    if not filename:
        filename = default_name
    if os.path.exists(filename):
        while True:
            ow = input(f"File '{filename}' exists. Overwrite? [y/n]: ").strip().lower()
            if ow in ("y","n"): break
        if ow == "n":
            print("Aborted: not overwriting existing file.")
            return
    # prepare module source and write
    src = generate_module_source(program, module_name=os.path.splitext(os.path.basename(filename))[0],
                                 docstring="Auto-generated by generator.py")
    write_module_file(filename, src)
    print(f"Wrote generated algorithm to '{filename}'. Attempting to import and verify...")
    try:
        mod = import_module_from_path(os.path.abspath(filename), "generated_algo_runtime")
        if hasattr(mod, "apply_program"):
            print("Imported. Running verification test on a few arrays:")
            for t in tests:
                res = mod.apply_program(list(t))
                print(f"{t} -> {res}  sorted={all(res[i] <= res[i+1] for i in range(len(res)-1))}")
            print("\nSuccess. The generated module defines `apply_program(arr)` and ran correctly.")
            print(f"You can now import it from other scripts with dynamic import or just `import importlib.util`->load from path.")
        else:
            print("Import succeeded but `apply_program` not found in module (unexpected).")
    except Exception as e:
        print("Error importing generated module:", e)
        print("You can still inspect the file manually.")

if __name__ == "__main__":
    main()
