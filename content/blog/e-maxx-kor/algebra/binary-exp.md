---
title: Binary Exponentiation
mathjax: true
date: 2021-12-18 14:45:00
tags: e-maxx-kor, algebra
---

> 본 포스트는 [e-maxx.ru/algo](http://e-maxx.ru/algo/) 의 영문 번역본인 [cp-algorithms (e-maxx-eng)](https://cp-algorithms.com/index.html) 를 한국어로 번역한 것입니다. e-maxx 포스트의 저자는 [иванов максим](https://e-maxx.ru/about.php) 이며, cp-algorithms 포스트의 기여자는 [여기서](https://github.com/e-maxx-eng/e-maxx-eng/commits/master/src/algebra/binary-exp.md) 확인하실 수 있습니다. 본 포스트는 CC-BY-SA-4.0 License를 따릅니다.

<!--?title Binary Exponentiation-->

# Binary Exponentiation

Binary exponentiation (또는 exponentiation by squaring)은 $a^n$ 을 $O(\log n)$ 번의 곱셈만으로 계산할 수 있게 해주는 트릭이다 (나이브한 접근으로는 $O(n)$ 번의 곱셈이 필요하다).

굳이 곱셈이 아니더라도 **결합법칙 (associative property)** 을 성질로 가지는 모든 연산에 대해 사용할 수 있는 트릭이기 때문에, 다양한 상황에서 응용될 수 있다. 어떤 연산이 결합법칙을 성질로 가짐은 다음을 통해 보일 수 있다:

$$(X \cdot Y) \cdot Z = X \cdot (Y \cdot Z)$$

당연하게도, 이 트릭은 모듈러 곱, 행렬 곱이나 아래에서 소개할 다른 문제들을 푸는데 적용할 수 있다.

## Algorithm

$a$ 를 $n$ 제곱한다는 것을 나이브하게 풀어 쓰면 $a$ 를 $n - 1$ 번 곱하는 것으로 표현된다:
$a^{n} = a \cdot a \cdot \ldots \cdot a$. 그러나 이런 접근은 큰 $a$ 나 $n$ 에 대해서는 그리 실용적이지 못하다.

$a^{b+c} = a^b \cdot a^c$ and $a^{2b} = a^b \cdot a^b = (a^b)^2$.

Binary exponentiation 의 기본 아이디어는 지수의 이진 표현을 사용하여 작업을 분할하는 것이다.

아래는 지수 $n$ 을 이진법으로 나타낸 예시이다:
$$3^{13} = 3^{1101_2} = 3^8 \cdot 3^4 \cdot 3^1$$

$n$ 은 이진법으로 나타내면 정확히 $\lfloor \log_2 n \rfloor + 1$ 자리의 숫자를 가지기 때문에, 만약 거듭제곱 수열 $a^1, a^2, a^4, a^8, \dots, a^{\lfloor \log n \rfloor}$ 의 값을 알고 있다면, 그저 $O(\log n)$ 번의 곱셈만 수행하면 답을 구할 수 있다.

그래서 위의 거듭제곱 수열의 값을 어떻게 빠르게 구하는지만 알면 되는데, 다행히도 해당 수열의 원소는 그 이전 원소의 제곱이기 때문에 쉽게 구할 수 있다.

$$
\begin{align*}
3^1 &= 3 \\
3^2 &= \left(3^1\right)^2 = 3^2 = 9 \\
3^4 &= \left(3^2\right)^2 = 9^2 = 81 \\
3^8 &= \left(3^4\right)^2 = 81^2 = 6561
\end{align*}
$$

그래서 $3^{13}$ 에 대한 답을 구해보면, 위 수열의 세가지 원소만 곱해주면 된다. ($3^2$ 는 $n$ 에서 해당하는 비트가 켜져있지 않기 때문에 곱하지 않는다.):
$3^{13} = 6561 \cdot 81 \cdot 3 = 1594323$

알고리즘의 최종 시간 복잡도는 $O(\log n)$ 이다: $a$ 의 $\log n$ 거듭제곱을 계산해야 하고, 그 다음엔 최종 답을 구하기 위해서는 최대 $\log n$ 번의 곱셈을 해야 되기 때문이다.

다음의 재귀적인 접근은 같은 아이디어를 나타낸다:

$$
a^n = \begin{cases}
1 &\text{if } n == 0 \\
\left(a^{\frac{n}{2}}\right)^2 &\text{if } n > 0 \text{ and } n \text{ even}\\
\left(a^{\frac{n - 1}{2}}\right)^2 \cdot a &\text{if } n > 0 \text{ and } n \text{ odd}
\end{cases}
$$

## 구현

첫번째 방법으로는 위의 재귀식을 그대로 옮긴 재귀적 접근이 있다.

```cpp
long long binpow(long long a, long long b) {
    if (b == 0)
        return 1;
    long long res = binpow(a, b / 2);
    if (b % 2)
        return res * res * a;
    else
        return res * res;
}
```

두번째 방법은 재귀 없이 같은 문제를 해결할 수 있다. 이 방법은 루프에서 차례대로 거듭제곱 수열의 원소들을 계산하고, $n$에서 해당 비트가 켜져 있으면 원소를 답에 곱한다. 두 방법의 복잡도는 동일하지만, 이 방법은 재귀 호출의 오버헤드가 없기 때문에 실제 수행시간이 더 짧을 것이다.

```cpp
long long binpow(long long a, long long b) {
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
```

## 응용

### 빠른 모듈로 거듭제곱 계산

**문제:**
$x^n \bmod m$ 를 계산하라. 이것은 아주 흔한 문제이다. 예를 들어서 이것은 [모듈로 곱셈 역원 (modular multiplicative inverse)](./algebra/module-inverse.html)를 계산하는데 사용된다.

**해답:**
우리는 모듈로 연산이 곱셈과 간섭하지 않는 다는 것을 알기 때문에 ($a \cdot b \equiv (a \bmod m) \cdot (b \bmod m) \pmod m$), 기존의 코드를 그대로 사용할 수 있는데, 그저 매 곱셈을 모듈로 곱셈으로 바꿔주기만 하면 된다.

```cpp
long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
```

**참고:** 만약에 $m$ 이 소수라면 $x ^ n$ 대신 $x ^ {n \mod (m-1)}$ 을 계산함으로써 이 알고리즘의 속도를 아주 약간 개선시킬 수 있다. 다음을 참조하면 좋다: [페르마의 소정리 (Fermat's little theorem)](./algebra/module-inverse.html#toc-tgt-2).

### 빠른 피보나치 수 계산

**문제:** $n$번째 피보나치 수 $F_n$ 를 계산하라.

**해답:** 자세히 알고 싶다면 다음을 참조하라: [피보나치 수열](./algebra/fibonacci-numbers.html).
여기서는 알고리즘의 개요만 간략히 살펴볼 것이다. 어떤 피보나치 수를 알고 싶다면 다음과 같이 이전 수 두 가지만 알면 된다: $F_n = F_{n-1} + F_{n-2}$. 그렇다면 $F_i$ 와 $F_{i+1}$ 에서 $F_{i+1}$ 와 $F_{i+2}$로의 변환을 나타내는 $2 \times 2$ 행렬을 만들 수 있다. 예를 들어서, $F_0$ 와 $F_1$ 에 위의 변환을 수행하면 각각 $F_1$ 과 $F_2$ 로 바뀔 것이다. 그래서, 이 변환 행렬을 $n$ 거듭제곱하게 되면 $F_n$ 을 시간 복잡도 $O(\log n)$ 에 찾을 수 있다.

### 순열 $k$ 번 합성하기

**문제:** 길이 $n$ 순열이 주어졌을 때, 해당 순열을 $k$ 번 합성하라.

**해답:** 단순하게 순열을 binary exponentiation을 사용하여 $k$ 번 합성하고, 이를 수열의 모든 원소에 대해 적용시키면 된다. 시간복잡도는 $O(n \log k)$ 이다.

**참고:** 이 문제는 순열 그래프를 만들고 각 사이클을 독립적으로 고려해준다면 더 효율적으로 풀 수 있다. 사이클 길이를 모듈로 $k$ 하면 해당 사이클에 해당하는 각 숫자마다 최종적인 위치를 찾을 수 있다.

### 점 집합에 대한 여러 기하연산들의 빠른 계산

**문제:** 주어진 $n$ 개의 모든 점들 $p_i$ 에 대해서, $m$ 번의 변환을 적용시켜라. 각 변환은 시프트 변환, 크기 변환 또는 주어진 축을 중심으로 주어진 각도만큼의 회전변환일 수 있다. 주어진 연산들의 목록을 $k$ 번 반복하는데 사용되는 "루프" 연산 또한 존재한다 ("루프" 연산은 중첩될 수 있다). $length$ 가 "루프" 연산을 다 풀어 놓았을 때의 적용해야할 변환들의 개수 일때, 모든 변환을 $O(n \cdot length)$ 보다 빠르게 적용시켜야 한다.

**해답:** 변환 유형에 따라 좌표가 어떻게 바뀌는지를 살펴보자:

- 쉬프트 변환: 각 좌표에 서로 다른 상수를 더한다.
- 크기 변환: 각 좌표에 서로 다른 상수를 곱한다.
- 회전 변환: 이 변환은 조금 더 복잡하지만 (여기서 자세히 다루지는 않을 것이다), 새로운 좌표는 여전히 이전의 좌표를 선형결합한 것으로 나타낼 수 있다.

각각의 변환은 좌표의 선형 연산을 통해 나타내질 수 있는 것을 확인할 수 있다. 따라서 변환은 $4 \times 4$ 의 행렬로 나타내질 수 있다:

$$
\begin{pmatrix}
a_{11} & a_ {12} & a_ {13} & a_ {14} \\\
a_{21} & a_ {22} & a_ {23} & a_ {24} \\\
a_{31} & a_ {32} & a_ {33} & a_ {34} \\\
a_{41} & a_ {42} & a_ {43} & a_ {44}
\end{pmatrix}
$$

이전 좌표와 단위에 해당하는 벡터에 변환 행렬을 곱하면 새로운 좌표와 단위에 해당하는 벡터를 얻을 수 있다:

$$
\begin{pmatrix} x & y & z & 1 \end{pmatrix} \cdot
\begin{pmatrix}
a_{11} & a_ {12} & a_ {13} & a_ {14} \\\
a_{21} & a_ {22} & a_ {23} & a_ {24} \\\
a_{31} & a_ {32} & a_ {33} & a_ {34} \\\
a_{41} & a_ {42} & a_ {43} & a_ {44}
\end{pmatrix}
 = \begin{pmatrix} x' & y' & z' & 1 \end{pmatrix}
$$

(왜 가상의 4번째 좌표가 필요한지를 궁금하다면: 4번째 좌표 없이는 쉬프트 변환을 구현할 수 없었을 것이다. 쉬프트 변환은 좌표에 상수를 더해야 하는데, 가상의 좌표가 없으면 좌표에 오로지 선형 결합만 적용할 수 있기 때문에, 상수를 더할 수 없다.)

아래는 변환이 어떻게 행렬로 나타내지는 지에 대한 예시이다:

- 쉬프트 변환: $x$ 좌표를 $5$, $y$ 좌표를 $7$, 그리고 $z$ 좌표를 $9$ 만큼 쉬프트 했을 때.

  $$
  \begin{pmatrix}
  1 & 0 & 0 & 0 \\\
  0 & 1 & 0 & 0 \\\
  0 & 0 & 1 & 0 \\\
  5 & 7 & 9 & 1
  \end{pmatrix}
  $$

- 크기 변환: $x$ 좌표를 $10$ 만큼, 그리고 $y$ 와 $z$ 좌표를 $5$ 만큼 스케일 했을 때.

  $$
  \begin{pmatrix}
  10 & 0 & 0 & 0 \\\
  0 & 5 & 0 & 0 \\\
  0 & 0 & 5 & 0 \\\
  0 & 0 & 0 & 1
  \end{pmatrix}
  $$

- 회전 변환: 오른손의 규칙 (반시계 방향)에 따라 $x$ 축을 $\theta$ 도 만큼 회전시켰을 때.
  $$
  \begin{pmatrix}
  1 & 0 & 0 & 0 \\\
  0 & \cos \theta & -\sin \theta & 0 \\\
  0 & \sin \theta & \cos \theta & 0 \\\
  0 & 0 & 0 & 1
  \end{pmatrix}
  $$

이제 모든 변환이 행렬로 나타졌기 때문에 일련의 변환들은 해당 행렬들의 곱으로 나타내질 수 있다. 그리고 $k$ 만큼의 반복을 나타내는 "루프" 연산은 행렬을 $k$ 거듭제곱한 것으로 나타낼 수 있다 (binary exponentiation 을 사용하면 $O(\log{k})$ 에 계산할 수 있다). 이러한 방법으로, 모든 변환들을 나타내는 행렬을 계산을 $O(m \log{k})$ 안에 수행할 수 있다. 그리고 이것을 $n$ 개의 점에 적용하려면 $O(n)$ 의 시간을 소요하고, 전체 시간 복잡도는 $O(n + m \log{k})$ 가 된다.

### 그래프에서 길이가 $k$ 인 경로 개수 찾기

**문제:** $n$ 개의 정점으로 이루어진 가중치가 없는 방향 그래프가 주어졌을 때, 아무 정점 $u$ 에서 다른 아무 정점 $v$ 으로 가는 길이가 $k$ 인 경로의 개수를 찾아라.

**해답:** 이 문제는 [별도의 페이지](./graph/fixed_length_paths.html) 에서 더 자세하게 다루어진다. 이 문제를 해결하는 알고리즘은 그래프의 인접 행렬 $M$ ($i$ 에서 $j$ 로 가는 간선이 있으면 $m_{ij} = 1$, 아니면 $0$ 인 행렬) 을 $k$ 거듭제곱 하는 것이다. 그렇다면 이제 $m_{ij}$ 는 $i$ 에서 $j$ 로 가는 길이 $k$ 의 경로의 개수가 될 것이다. 이 해답의 시간 복잡도는 $O(n^3 \log k)$ 이다.

**참고:** 이 문제의 다른 변형인, 간선에 가중치가 있고 정확히 $k$ 개의 간선으로만 이루어져 있는 최소 가중치 경로 찾기 문제가 위의 페이지에서 다뤄지고 있다. 해당 글에서 보여지는 것 처럼, 이 문제도 마찬가지로 인접 행렬의 exponentiation으로 해결할 수 있다. 행렬은 $i$ 에서 $j$ 으로 가는 간선의 가중치를 가지거나 그러한 행렬이 없다면 $\infty$ 값을 가질 것이다.
기존의 두 행렬을 곱하는 방법 대신, 수정된 다음의 방법을 사용하여야 한다:
곱셈 대신에 두 값은 더해져야하고, 모든값들을 더하는 대신에 최솟값을 가져가야 한다.
이것은 다음과 같다: $result_{ij} = \min\limits_{1\ \leq\ k\ \leq\ n}(a_{ik} + b_{kj})$.

### Binary exponentiation 의 변형: 모듈로 $m$ 에서 두 수의 곱

**문제:** 두 수 $a$ 와 $b$ 를 모듈로 $m$ 에서 곱하라. $a$ 와 $b$ 는 빌트인 자료형에 담을 수 있지만 두 수의 곱은 너무 커서 64-bit 정수에 담을 수 없다. 큰수의 산술 없이 $a \cdot b \pmod m$ 를 계산하는 아이디어 이다.

**해답:** 위에서 언급한 2진수 표현 알고리즘을 사용하고 곱셈 대신 덧셈을 사용하기만 하면 된다. 두 수의 곱을 $O (\log m)$ 번의 덧셈과 2로 곱하는 연산으로 "확장"시킨 것이라고 할 수 있다 (본질적으로는 덧셈인 것이다).

$$
a \cdot b = \begin{cases}
0 &\text{if }a = 0 \\
2 \cdot \frac{a}{2} \cdot b &\text{if }a > 0 \text{ and }a \text{ even} \\
2 \cdot \frac{a-1}{2} \cdot b + b &\text{if }a > 0 \text{ and }a \text{ odd}
\end{cases}
$$

**참고:** 이 문제는 부동소수점을 이용한 다른 방법으로도 풀 수 있다. 우선 부동소수점을 사용하여 식 $\frac{a \cdot b}{m}$ 을 계산한 다음 unsigned int $q$ 로 캐스팅 한다. $a \cdot b$ 에서 unsigned int 연산을 사용하여 $q \cdot m$ 를 뺀 후 모듈로 $m$ 을 하여 답을 구하면 된다. 이 솔루션은 신뢰성이 없어 보이지만 아주 빠르게 동작하고 구현하기도 매우 쉽다. 더 자세한 정보는 [이곳](https://cs.stackexchange.com/questions/77016/modular-multiplication) 에서 확인할 수 있다.

## 연습 문제

- [UVa 1230 - MODEX](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=3671)
- [UVa 374 - Big Mod](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=310)
- [UVa 11029 - Leading and Trailing](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1970)
- [Codeforces - Parking Lot](http://codeforces.com/problemset/problem/630/I)
- [SPOJ - The last digit](http://www.spoj.com/problems/LASTDIG/)
- [SPOJ - Locker](http://www.spoj.com/problems/LOCKER/)
- [LA - 3722 Jewel-eating Monsters](https://icpcarchive.ecs.baylor.edu/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1723)
- [SPOJ - Just add it](http://www.spoj.com/problems/ZSUM/)
