🧮 Fibonacci Showcase: Recursive vs Iterative in Go 🚀

Explore two ways to compute Fibonacci numbers in Go, benchmark their performance, and understand why algorithmic insight matters.




📖 Table of Contents

Problem

Implementations

Recursive

Iterative

Benchmark Results

Insights

Usage

License

🔹 Problem

The Fibonacci sequence is a series where each number is the sum of the two preceding ones:

F(0) = 0
F(1) = 1
F(n) = F(n-1) + F(n-2), n > 1

Sequence example:

0, 1, 1, 2, 3, 5, 8, 13, ...

Goal: Compute the n-th Fibonacci number efficiently and compare two approaches: recursive vs iterative.

💻 Implementations
Recursive Fibonacci 🔁

Elegant and follows the mathematical definition:

func FibonacciRecursive(n int) int {
    if n == 0 { return 0 }
    if n == 1 { return 1 }
    return FibonacciRecursive(n-1) + FibonacciRecursive(n-2)
}

Pros: Simple, intuitive.

Cons: Exponentially slow for large n, repeats calculations many times.

Iterative Fibonacci 🔄

Efficient, uses a loop:

func FibonacciIterative(n int) int {
    if n == 0 { return 0 }
    if n == 1 { return 1 }


    a, b := 0, 1
    for i := 2; i <= n; i++ {
        a, b = b, a+b
    }
    return b
}

Pros: Linear time O(n), constant space O(1), extremely fast.

Demonstrates how understanding patterns allows optimized computation.

⏱ Benchmark Results
Recursive Fibonacci
n	Result	Time (s)
41	165580141	0.893
42	267914296	1.436
43	433494437	2.378
44	701408733	3.790
45	1134903170	6.214
46	1836311903	10.057
Iterative Fibonacci (avg per call)
n	Result	Avg Time per call (ns)
46	1836311903	20
460	-3461060371988318125	177
4600	230206383445398507	1779
46000	978664232609031707	19111
Additional averaged benchmarks (larger scale)
x	y1	y2
8.10	3.37637	1.2153
8.20	3.57458	1.2756
8.30	3.73535	1.3175
8.40	4.05641	1.4019
8.50	4.14432	1.4224
8.60	4.03505	1.3969
8.90	4.33160	1.4668

These represent averages over ~90 runs, scaled for presentation.

📊 Graph Visualization

File: graph.png

Shows exponential growth of recursive calls vs linear growth of iterative method.




💡 Insights

Recursive version: beautiful, intuitive, but slow for large numbers.

Iterative version: fast, efficient, reuses intermediate results.

Measuring execution time + visualizing growth helps understand algorithmic complexity.

Optimization comes from recognizing patterns and leveraging previous results — a core skill for developers and problem-solvers.

This project shows how deeper understanding converts a naive solution into a high-performance one.

🚀 Usage

Clone the repo:

git clone https://github.com/<your-username>/FibonacciShowcase.git
cd FibonacciShowcase

Run Recursive:

go run fib_recursive.go

Run Iterative:

go run fib_iterative.go
📝 License

MIT License ©

