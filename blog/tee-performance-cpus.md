<div align="center">
  <nav>
    <a href="/">Home</a>&nbsp;&nbsp;
    <a href="/components.md">Components</a>&nbsp;&nbsp;
    <a href="/enterprise.md">Enterprise</a>&nbsp;&nbsp;
    <a href="/docs/">Docs</a>&nbsp;&nbsp;
    <a href="/blog/">Blog</a>&nbsp;&nbsp;
    <a href="/careers/">Careers</a>
  </nav>
</div>


# TEE Performance on CPUs
September 15, 2025

"What's the catch?" is a common question we get regarding TEEs. What is the performance tradeoff for getting the hardware-level security guarantees that TEEs provide? The de-facto assumption is that there must be significant performance penalties for the strong isolation and encryption that Trusted Execution Environments provide.

We ran the tests and have the answer: **there isn't really a catch**. We ran comprehensive benchmarks comparing identical workloads inside TEE-enabled versus virtual machines, and the results show TEE overhead is remarkably minimal on CPUs, even for the most computationally intensive operations.

## The Bottom Line

Performance difference across multiple metrics hovers around **1.5%**. The largest overhead we observed across any computational stage was **2.08%**.

Here's a table summarizing the key performance metrics when running a proving workload on both TEE-protected and unprotected systems:

| Metric           | TEE Environment | Regular Environment | Performance Difference |
| ---------------- | --------------- | ------------------- | ---------------------- |
| Execution Speed  | 5.16 kHz        | 5.26 kHz            | -1.90%                 |
| Runtime Duration | 89.46s          | 87.78s              | +1.91%                 |
| CPU Utilization  | 26.61%          | 26.23%              | +1.45%                 |
| Memory Usage     | 19.02 GB        | 18.87 GB            | +0.80%                 |

## The Test Setup

We chose to benchmark cryptographic proving systems because they represent some of the most computationally demanding workloads you can run in terms of CPU, and memory utilization. If TEE overhead is negligible for these applications, it will be negligible for almost anything else running on CPUs.

### The Workload: Zero-Knowledge Virtual Machine
The specific system we tested was a zero-knowledge virtual machine (zkVM) that takes any computer program, executes it, and generates cryptographic proofs of correct execution.

### Proof System Architecture
The zkVM uses STARK (Scalable Transparent Arguments of Knowledge) proofs backed by the Stwo prover from StarkWare. STARK proofs are particularly demanding because they heavily utilize hashes and involve intensive field arithmetic operations that are resource intensive.

### Test Programs
We benchmarked standard computational workloads including Fibonacci sequence calculations and sorting algorithms.

### Hardware Configuration
- **Processor:** AMD EPYC Series, 4 cores, 32GB RAM
- **TEE Implementation:** AMD SEV-SNP (Secure Encrypted Virtualization - Secure Nested Paging)
- **Comparison:** Identical machines, one with SEV-SNP enabled, one without TEE capabilities

### Benchmark Methodology
The benchmarking process measured four distinct computational phases:

1. **Native Execution:** Direct program execution to establish baseline performance
2. **Program Emulation:** Running the program in a virtual machine to capture its execution trace
3. **Cryptographic Proving:** Generation of mathematical proofs of execution using the ZKPs
4. **Proof Verification:** Checking that the generated proofs are valid

Each test ran multiple iterations to ensure statistical significance, measuring execution speed, duration, and resource utilization across all stages.

## Detailed Performance Breakdown

### Overall System Performance

This table shows the aggregate performance metrics across the entire zkVM proving workflow, demonstrating that TEE overhead remains consistently minimal across all key system resources.

| Metric           | TEE VM | Regular VM | Difference | % Change |
| ---------------- | ------ | ---------- | ---------- | -------- |
| Avg Speed (kHz)  | 5.16   | 5.26       | -0.10      | -1.90%   |
| Avg Duration (s) | 89.46  | 87.78      | +1.68      | +1.91%   |
| Peak CPU (%)     | 26.61  | 26.23      | +0.38      | +1.45%   |
| Peak Memory (GB) | 19.02  | 18.87      | +0.15      | +0.80%   |

### Stage-by-Stage Performance Analysis

#### Native Execution Stage

This table captures the performance when running programs directly without any ZK proving, establishing the baseline execution characteristics for both TEE and regular environments.

| Metric        | TEE VM  | Regular VM | Difference | % Change |
| ------------- | ------- | ---------- | ---------- | -------- |
| Speed (kHz)   | 7296.84 | 7437.21    | -140.37    | -1.88%   |
| Duration (s)  | 0.064   | 0.063      | +0.001     | +1.59%   |
| CPU Usage (%) | 26.61   | 26.18      | +0.43      | +1.64%   |
| Memory (GB)   | 18.17   | 18.05      | +0.12      | +0.66%   |

#### Program Emulation Stage

This table shows the performance during program emulation, where the virtual machine captures execution traces—notably, this stage exhibits the highest TEE overhead at 2.08% for emulation overhead.

| Metric             | TEE VM  | Regular VM | Difference | % Change |
| ------------------ | ------- | ---------- | ---------- | -------- |
| Speed (kHz)        | 1616.27 | 1650.19    | -33.92     | -2.06%   |
| Duration (s)       | 0.29    | 0.284      | +0.006     | +2.11%   |
| Emulation Overhead | 4.52x   | 4.43x      | +0.09      | +2.08%   |
| CPU Usage (%)      | 25.00   | 24.65      | +0.35      | +1.42%   |
| Memory (GB)        | 18.18   | 18.07      | +0.11      | +0.61%   |

*Emulation Overhead measures how much slower the emulated execution is compared to native execution*

#### Cryptographic Proving Stage

This table presents the most computationally intensive phase where STARK proofs are generated, yet TEE overhead remains under 2% even for these cryptographically demanding operations.

| Metric        | TEE VM | Regular VM | Difference | % Change |
| ------------- | ------ | ---------- | ---------- | -------- |
| Speed (kHz)   | 5.18   | 5.27       | -0.09      | -1.71%   |
| Duration (s)  | 89.17  | 87.67      | +1.50      | +1.71%   |
| CPU Usage (%) | 25.13  | 24.78      | +0.35      | +1.41%   |
| Memory (GB)   | 19.02  | 18.89      | +0.13      | +0.69%   |

#### Proof Verification Stage

This table shows the final verification phase where generated proofs are validated, demonstrating that TEE overhead remains minimal even for cryptographic verification operations.

| Metric        | TEE VM | Regular VM | Difference | % Change |
| ------------- | ------ | ---------- | ---------- | -------- |
| Speed (kHz)   | 658.91 | 667.45     | -8.54      | -1.28%   |
| Duration (s)  | 0.70   | 0.693      | +0.007     | +1.01%   |
| CPU Usage (%) | 26.15  | 25.92      | +0.23      | +0.89%   |
| Memory (GB)   | 19.02  | 18.93      | +0.09      | +0.48%   |