---
title: E-maxx Algorithms 한국어 현지화 프로젝트
mathjax: true
date: 2021-12-18 15:12:00
tags: e-maxx-kor
---

*본 프로젝트는 [e-maxx.ru/algo](http://e-maxx.ru/algo/) 의 영문 번역본인 [cp-algorithms (e-maxx-eng)](https://cp-algorithms.com/index.html) 를 한국어로 번역한 것입니다. e-maxx 프로젝트의 저자는 [иванов максим](https://e-maxx.ru/about.php) 이며, cp-algorithms 프로젝트의 기여자는 [여기서](https://github.com/e-maxx-eng/e-maxx-eng) 확인하실 수 있습니다. 본 프로젝트는 CC-BY-SA-4.0 License를 따릅니다.*

- 본 프로젝트의 오탈자 및 기타 오류에 대한 문의나 프로젝트 참여는 sylvester@ajou.ac.kr로 문의 주시길 바랍니다.
- 추후에 개인 블로그가 아닌 독립적인 웹 사이트에서 호스팅할 예정입니다. 업데이트가 있으면 이곳에 공지하도록 하겠습니다.
- 현재 몇몇의 내부 링크를 사용할 수 없습니다. 빠르게 수정하도록 하겠습니다.

## 기여자
- [cwlo2F](https://cwlo2f.github.io/about/) - 오일러 피 함수, 모듈러 역원, Number of divisors / sum of divisors, 선형 합동방정식 번역
- akim9905 - 희소테이블 번역

별도의 명시자가 없는 경우 번역자는 권도현입니다.

## Articles (번역 후)

### 대수

- **기초**
    - [이진 거듭제곱](./algebra/binary-exp.html)
    - [최대공약수 계산을 위한 유클리드 호제법](./algebra/euclid-algorithm.html)
    - [확장 유클리드 호제법](./algebra/extended-euclid-algorithm.html)
    - [선형 디오판토스 방정식](./algebra/linear-diophantine-equation.html) 
    - [피보나치 수열](./algebra/fibonacci-numbers.html)
- **소수들**
    - [에라토스테네스의 체](./algebra/sieve-of-eratosthenes.html)
- **Number-theoretic functions**
    - [오일러 피 함수](./algebra/phi-function.html)
    - [Number of divisors / sum of divisors](./algebra/divisors.html)
- **모듈러 산술**
    - [모듈러 역원](./algebra/module-inverse.html)
    - [선형 합동방정식](./algebra/linear-congruence-equation.html)

### 자료구조

- **기초**
- [희소 테이블](./data_structures/sparse-table.html) ([임시 링크 (notion)](https://workspacehyunbin.notion.site/emaxx-c460e8150dee40b1bb6c82d9abaf9880))
    
---

## Articles (번역 전)

### Algebra

- **Fundamentals**
    - 번역 완료 
- **Prime numbers**
    - [Linear Sieve](./algebra/prime-sieve-linear.html)
    - [Primality tests](./algebra/primality_tests.html)
    - [Integer factorization](./algebra/factorization.html)
- **Number-theoretic functions**
    - 번역완료
- **Modular arithmetic**
    - [Chinese Remainder Theorem](./algebra/chinese-remainder-theorem.html)
    - [Factorial modulo $p$](./algebra/factorial-modulo.html)
    - [Discrete Log](./algebra/discrete-log.html)
    - [Primitive Root](./algebra/primitive-root.html)
    - [Discrete Root](./algebra/discrete-root.html)
    - [Montgomery Multiplication](./algebra/montgomery_multiplication.html)
- **Number systems**
    - [Balanced Ternary](./algebra/balanced-ternary.html)
    - [Gray code](./algebra/gray-code.html)
- **Miscellaneous**
    - [Enumerating submasks of a bitmask](./algebra/all-submasks.html)
    - [Arbitrary-Precision Arithmetic](./algebra/big-integer.html)
    - [Fast Fourier transform](./algebra/fft.html)
    - [Operations on polynomials and series](./algebra/polynomial.html)

### Data Structures

- **Fundamentals**
    - [Minimum Stack / Minimum Queue](./data_structures/stack_queue_modification.html)
    - [Sparse Table](./data_structures/sparse-table.html)
- **Trees**
    - [Disjoint Set Union](./data_structures/disjoint_set_union.html)
    - [Fenwick Tree](./data_structures/fenwick.html)
    - [Sqrt Decomposition](./data_structures/sqrt_decomposition.html)
    - [Segment Tree](./data_structures/segment_tree.html)
    - [Treap](./data_structures/treap.html)
    - [Sqrt Tree](./data_structures/sqrt-tree.html)
    - [Randomized Heap](./data_structures/randomized_heap.html)
- **Advanced**
    - [Deleting from a data structure in O(T(n)log n)](./data_structures/deleting_in_log_n.html)

### Dynamic Programming

- **DP optimizations**
    - [Divide and Conquer DP](./dynamic_programming/divide-and-conquer-dp.html)
- **Tasks**
    - [Dynamic Programming on Broken Profile. Problem "Parquet"](./dynamic_programming/profile-dynamics.html)
    - [Finding the largest zero submatrix](./dynamic_programming/zero_matrix.html)

### String Processing

- **Fundamentals**
    - [String Hashing](./string/string-hashing.html)
    - [Rabin-Karp for String Matching](./string/rabin-karp.html)
    - [Prefix function - Knuth-Morris-Pratt](./string/prefix-function.html)
    - [Z-function](./string/z-function.html)
    - [Suffix Array](./string/suffix-array.html)
    - [Aho-Corasick algorithm](./string/aho_corasick.html)
- **Advanced**
    - [Suffix Tree](./string/suffix-tree-ukkonen.html)
    - [Suffix Automaton](./string/suffix-automaton.html)
    - [Lyndon factorization](./string/lyndon_factorization.html)
- **Tasks**
    - [Expression parsing](./string/expression_parsing.html)
    - [Manacher's Algorithm - Finding all sub-palindromes in O(N)](./string/manacher.html)
    - [Finding repetitions](./string/main_lorentz.html)

### Linear Algebra

- **Matrices**
    - [Gauss & System of Linear Equations](./linear_algebra/linear-system-gauss.html)
    - [Gauss & Determinant](./linear_algebra/determinant-gauss.html)
    - [Kraut & Determinant](./linear_algebra/determinant-kraut.html)
    - [Rank of a matrix](./linear_algebra/rank-matrix.html)

### Combinatorics

- **Fundamentals**
    - [Finding Power of Factorial Divisor](./algebra/factorial-divisors.html)
    - [Binomial Coefficients](./combinatorics/binomial-coefficients.html)
    - [Catalan Numbers](./combinatorics/catalan-numbers.html)
- **Techniques**
    - [The Inclusion-Exclusion Principle](./combinatorics/inclusion-exclusion.html)
    - [Burnside's lemma / Pólya enumeration theorem](./combinatorics/burnside.html)
    - [Stars and bars](./combinatorics/stars_and_bars.html)
    - [Generating all $K$-combinations](./combinatorics/generating_combinations.html)
- **Tasks**
    - [Placing Bishops on a Chessboard](./combinatorics/bishops-on-chessboard.html)
    - [Balanced bracket sequences](./combinatorics/bracket_sequences.html)
    - [Counting labeled graphs](./combinatorics/counting_labeled_graphs.html)

### Numerical Methods

- **Search**
    - [Ternary Search](./num_methods/ternary_search.html)
    - [Newton's method for finding roots](./num_methods/roots_newton.html)
- **Integration**
    - [Integration by Simpson's formula](./num_methods/simpson-integration.html)

### Geometry

- **Elementary operations**
    - [Basic Geometry](./geometry/basic-geometry.html)
    - [Finding the equation of a line for a segment](./geometry/segment-to-line.html)
    - [Intersection Point of Lines](./geometry/lines-intersection.html)
    - [Check if two segments intersect](./geometry/check-segments-intersection.html)
    - [Intersection of Segments](./geometry/segments-intersection.html)
    - [Circle-Line Intersection](./geometry/circle-line-intersection.html)
    - [Circle-Circle Intersection](./geometry/circle-circle-intersection.html)
    - [Common tangents to two circles](./geometry/tangents-to-two-circles.html)
    - [Length of the union of segments](./geometry/length-of-segments-union.html)
- **Polygons**
    - [Oriented area of a triangle](./geometry/oriented-triangle-area.html)
    - [Area of simple polygon](./geometry/area-of-simple-polygon.html)
    - [Check if points belong to the convex polygon in O(log N)](./geometry/point-in-convex-polygon.html)
    - [Minkowski sum of convex polygons](./geometry/minkowski.html)
    - [Pick's Theorem - area of lattice polygons](./geometry/picks-theorem.html)
    - [Lattice points of non-lattice polygon](./geometry/lattice-points.html)
- **Convex hull**
    - [Convex hull construction](./geometry/convex-hull.html)
    - [Convex hull trick and Li Chao tree](./geometry/convex_hull_trick.html)
- **Sweep-line**
    - [Search for a pair of intersecting segments](./geometry/intersecting_segments.html)
    - [Point location in O(log N)](./geometry/point-location.html)
- **Miscellaneous**
    - [Finding the nearest pair of points](./geometry/nearest_points.html)
    - [Delaunay triangulation and Voronoi diagram](./geometry/delaunay.html)
    - [Vertical decomposition](./geometry/vertical_decomposition.html)
    - [Half-plane intersection - S&I Algorithm in O(Nlog N)](./geometry/halfplane-intersection.html)

### Graphs

- **Graph traversal**
    - [Breadth First Search](./graph/breadth-first-search.html)
    - [Depth First Search](./graph/depth-first-search.html)
- **Connected components, bridges, articulations points**
    - [Finding Connected Components](./graph/search-for-connected-components.html)
    - [Finding Bridges in O(N+M)](./graph/bridge-searching.html)
    - [Finding Bridges Online](./graph/bridge-searching-online.html)
    - [Finding Articulation Points in O(N+M)](./graph/cutpoints.html)
    - [Strongly Connected Components and Condensation Graph](./graph/strongly-connected-components.html)
    - [Strong Orientation](./graph/strong-orientation.html)
- **Single-source shortest paths**
    - [Dijkstra - finding shortest paths from given vertex](./graph/dijkstra.html)
    - [Dijkstra on sparse graphs](./graph/dijkstra_sparse.html)
    - [Bellman-Ford - finding shortest paths with negative weights](./graph/bellman_ford.html)
    - [0-1 BFS](./graph/01_bfs.html)
    - [D´Esopo-Pape algorithm](./graph/desopo_pape.html)
- **All-pairs shortest paths**
    - [Floyd-Warshall - finding all shortest paths](./graph/all-pair-shortest-path-floyd-warshall.html)
    - [Number of paths of fixed length / Shortest paths of fixed length](./graph/fixed_length_paths.html)
- **Spanning trees**
    - [Minimum Spanning Tree - Prim's Algorithm](./graph/mst_prim.html)
    - [Minimum Spanning Tree - Kruskal](./graph/mst_kruskal.html)
    - [Minimum Spanning Tree - Kruskal with Disjoint Set Union](./graph/mst_kruskal_with_dsu.html)
    - [Second best Minimum Spanning Tree - Using Kruskal and Lowest Common Ancestor](./graph/second_best_mst.html)
    - [Kirchhoff Theorem](./graph/kirchhoff-theorem.html)
    - [Prüfer code](./graph/pruefer_code.html)
- **Cycles**
    - [Checking a graph for acyclicity and finding a cycle in O(M)](./graph/finding-cycle.html)
    - [Finding a Negative Cycle in the Graph](./graph/finding-negative-cycle-in-graph.html)
    - [Eulerian Path](./graph/euler_path.html)
- **Lowest common ancestor**
    - [Lowest Common Ancestor](./graph/lca.html)
    - [Lowest Common Ancestor - Binary Lifting](./graph/lca_binary_lifting.html)
    - [Lowest Common Ancestor - Farach-Colton and Bender algorithm](./graph/lca_farachcoltonbender.html)
    - [Solve RMQ by finding LCA](./graph/rmq_linear.html)
    - [Lowest Common Ancestor - Tarjan's off-line algorithm](./graph/lca_tarjan.html)
- **Flows and related problems**
    - [Maximum flow - Ford-Fulkerson and Edmonds-Karp](./graph/edmonds_karp.html)
    - [Maximum flow - Push-relabel algorithm](./graph/push-relabel.html)
    - [Maximum flow - Push-relabel algorithm improved](./graph/push-relabel-faster.html)
    - [Maximum flow - Dinic's algorithm](./graph/dinic.html)
    - [Maximum flow - MPM algorithm](./graph/mpm.html)
    - [Flows with demands](./graph/flow_with_demands.html)
    - [Minimum-cost flow](./graph/min_cost_flow.html)
    - [Assignment problem. Solution using min-cost-flow in O (N^5)](./graph/Assignment-problem-min-flow.html)
- **Matchings and related problems**
    - [Bipartite Graph Check](./graph/bipartite-check.html)
    - [Kuhn' Algorithm - Maximum Bipartite Matching](./graph/kuhn_maximum_bipartite_matching.html)
- **Miscellaneous**
    - [Topological Sorting](./graph/topological-sort.html)
    - [Edge connectivity / Vertex connectivity](./graph/edge_vertex_connectivity.html)
    - [Tree painting](./graph/tree_painting.html)
    - [2-SAT](./graph/2SAT.html)
    - [Heavy-light decomposition](./graph/hld.html)

### Miscellaneous

- **Sequences**
    - [RMQ task (Range Minimum Query - the smallest element in an interval)](./sequences/rmq.html)
    - [Longest increasing subsequence](./sequences/longest_increasing_subsequence.html)
    - [Search the subsegment with the maximum/minimum sum](./others/maximum_average_segment.html)
    - [K-th order statistic in O(N)](./sequences/k-th.html)
- **Game Theory**
    - [Games on arbitrary graphs](./game_theory/games_on_graphs.html)
    - [Sprague-Grundy theorem. Nim](./game_theory/sprague-grundy-nim.html)
- **Schedules**
    - [Scheduling jobs on one machine](./schedules/schedule_one_machine.html)
    - [Scheduling jobs on two machines](./schedules/schedule_two_machines.html)
    - [Optimal schedule of jobs given their deadlines and durations](./schedules/schedule-with-completion-duration.html)
- **Miscellaneous**
    - [Josephus problem](./others/josephus_problem.html)
    - [15 Puzzle Game: Existence Of The Solution](./others/15-puzzle.html)
    - [The Stern-Brocot Tree and Farey Sequences](./others/stern_brocot_tree_farey_sequences.html)

---

감사합니다. 
