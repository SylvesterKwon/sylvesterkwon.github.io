---
title: 피보나치 수열
mathjax: true
date: 2021-12-24 15:27:00
tags: e-maxx-kor, algebra
---

> 본 포스트는 [e-maxx.ru/algo](http://e-maxx.ru/algo/) 의 영문 번역본인 [cp-algorithms (e-maxx-eng)](https://cp-algorithms.com/index.html) 를 한국어로 번역한 것입니다. e-maxx 포스트의 저자는 [иванов максим](https://e-maxx.ru/about.php) 이며, cp-algorithms 포스트의 기여자는 [여기서](https://github.com/e-maxx-eng/e-maxx-eng/commits/master/src/algebra/fibonacci-numbers.md) 확인하실 수 있습니다. 본 포스트는 CC-BY-SA-4.0 License를 따릅니다.

# 피보나치 수열

피보나치 수열은 다음과 같이 정의된다:

$$
F_0 = 0, F_1 = 1, F_n = F_{n-1} + F_{n-2}
$$

피보나치 수열 ([OEIS A000045](http://oeis.org/A000045))을 첫번째 원소부터 나열하면 다음과 같다:

$$
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
$$

## 피보나치 수열의 법칙들

피보나치 수열은 많은 흥미로운 법칙들을 가지고 있다. 다음은 그중 몇가지이다:

- 카시니 항등식 (Cassini's identity):
  $$
  F_{n-1} F_{n+1} - F_n^2 = (-1)^n
  $$

- "덧셈" 규칙:
  $$
  F_{n+k} = F_k F_{n+1} + F_{k-1} F_n
  $$

- 이전의 규칙에서 $k = n$ 일 때:
  $$
  F_{2n} = F_n (F_{n+1} + F_{n-1})
  $$

- 위를 활용하면 음이 아닌 아무 정수 $k$ 에 대하여, $F_{nk}$ 가 $F_n$ 의 배수임을 귀납법을 사용하여 보일 수 있다.

- 그 역도 마찬가지로 성립한다: 만약 $F_m$ 이 $F_n$ 의 배수라면, $m$ 은 $n$ 의 배수이다.

- 최소공배수 항등식:
  $$
  GCD(F_m, F_n) = F_{GCD(m, n)}
  $$

- 피보나치 수들은 유클리드 호제법에 대한 최악의 케이스이다. ([라메의 정리 (Lamé's theorem)](./euclid-algorithm.html) 참조)

## 피보나치 부호화 (Fibonacci Coding)

우리는 피보나치 수열을 사용하여 양의 정수를 이진 부호어 (binary code word) 로 인코딩할 수 있다. 제켄도르프의 정리 (Zeckendorf's theorem)에 따르면, 모든 자연수 $n$ 은 고유의 피보나치 수들의 합으로 나타내질 수 있다:

$$
N = F_{k_1} + F_{k_2} + \ldots + F_{k_r}
$$

단, $k_1 \ge k_2 + 2,\ k_2 \ge k_3 + 2,\  \ldots,\  k_r \ge 2$ 를 만족해야 한다 (즉, 이 표현은 두개의 연속적인 피보나치 수들을 사용할 수 없다).

따라서 어떤 숫자든 피보나치 부호화를 사용하여 고유하게 인코딩할 수 있다.
그리고 이 표현은 이 표현에 $F_{i+2}$ 이 사용되었다면 $d_i$ 가 $1$ 인 이진부호어 $d_0 d_1 d_2 \dots d_s 1$ 로 나타낼 수 있다.
그리고 부호어의 끝을 나타내기 위하여 부호어의 끝에 $1$ 이 추가될 것이다.
이것이 두개의 연속된 켜져있는 비트가 허용되는 유일한 경우임을 주목하라.

$$
\begin{align}
1 &=& 1 &=& F_2 &=& (11)_F \\
2 &=& 2 &=& F_3 &=& (011)_F \\
6 &=& 5 + 1 &=& F_5 + F_2 &=& (10011)_F \\
8 &=& 8 &=& F_6 &=& (000011)_F \\
9 &=& 8 + 1 &=& F_6 + F_2 &=& (100011)_F \\
19 &=& 13 + 5 + 1 &=& F_7 + F_5 + F_2 &=& (1001011)_F
\end{align}
$$

정수 $n$ 을 인코딩하는 것은 간단한 그리디 알고리즘으로 해결할 수 있다:

1. $n$ 과 같거나 작은 수를 발견할 때 까지 피보나치 수를 큰 수에서 작은 수 순으로 반복하며 탐색한다.

2. 이 수가 $F_i$ 라고 가정하자. $n$ 에서 $F_i$ 를 뺀 후, $1$ 을 부호어의 $i-2$ 번째 자리에 추가한다 (최하위 비트부터 최상위 비트까지 0부터 시작하는 인덱스).

3. 나머지가 없어질 때 까지 반복한다.

4. 끝을 나타내기 위해 부호어의 끝에 $1$ 을 붙인다.

부호어를 디코딩하기 위해서는 먼저 끝에 붙어 있는 $1$ 을 제거해야한다. 그리고, 만약 $i$ 번째 비트가 켜져 있다면 (최하위 비트부터 최상위 비트까지 0부터 시작하는 인덱스), 답에 $F_{i+2}$ 를 더한다.

## n번째 피보나치 수 공식

피보나치 수를 차례대로 계산하다 보면 $n$ 번째 피보나치 수는 $O(n)$ 에 찾을 수 있다. 하지만 이보다 더 빠른 방법이 존재하며, 아래에서 해당 방법을 소개할 것이다.

### 닫힌 형태의 표현

"비네 공식 (Binet's formula)" 으로 알려진 공식이 있는데, 실은 드 무아브르 (de Moivre) 가 먼저 발견한 공식이다:

$$
F_n = \frac{\left(\frac{1 + \sqrt{5}}{2}\right)^n - \left(\frac{1 - \sqrt{5}}{2}\right)^n}{\sqrt{5}}
$$

이 공식은 귀납을 사용하면 쉽게 증명할 수 있지만, 생성 함수의 개념을 이용하거나 함수 방정식의 해를 구함으로써 연역할 수도 있다.

위 공식의 두번째 항의 절대값은 항상 $1$ 보다 작고, 기하급수적으로 빠르게 감소함을 알 수 있다. 그래서 첫번째 항의 값이 "거의" $F_n$ 이라고 할 수 있다. 이것을 수학적으로 다음과 같이 표현할 수 있다:

$$
F_n = \left[\frac{\left(\frac{1 + \sqrt{5}}{2}\right)^n}{\sqrt{5}}\right]
$$

여기서 대괄호는 가까운 정수로 반올림함을 의미한다.

이 두 공식들은 분수로 계산할 때 매우 높은 정확도를 요구하기 때문에 실제 계산에서는 거의 도움되지 않는다.

### 행렬 형태

다음 관계를 보이는 것은 쉽다:

$$
\begin{pmatrix}F_{n-1} & F_{n} \cr\end{pmatrix} = \begin{pmatrix}F_{n-2} & F_{n-1} \cr\end{pmatrix} \cdot \begin{pmatrix}0 & 1 \cr 1 & 1 \cr\end{pmatrix}
$$

$P \equiv \begin{pmatrix}0 & 1 \cr 1 & 1 \cr\end{pmatrix}$ 라고 하면, 다음을 얻는다:

$$
\begin{pmatrix}F_n & F_{n+1} \cr\end{pmatrix} = \begin{pmatrix}F_0 & F_1 \cr\end{pmatrix} \cdot P^n
$$

그래서 $F_n$ 을 찾으려면, 행렬 $P$ 를 $n$ 거듭제곱 하면 된다. 이것은 $O(\log n)$ 에 할 수 있다 ([Binary exponentiation](./binary-exp.html) 참조).

### 고속배가 법 (Fast Doubling Method)

위에서 소개했던 "덧셈" 규칙을 사용하면 다음과 같은 방정식을 얻을 수 있다:

$$
\begin{array}{rll}
                        F_{2k} &= F_k \left( 2F_{k+1} - F_{k} \right). \\
                        F_{2k+1} &= F_{k+1}^2 + F_{k}^2.
\end{array}
$$

따라서 위의 두 방정식을 사용하면 피보나치는 다음 코드를 사용하여 쉽게 계산될 수 있다:

```cpp
pair<int, int> fib (int n) {
    if (n == 0)
        return {0, 1};

    auto p = fib(n >> 1);
    int c = p.first * (2 * p.second - p.first);
    int d = p.first * p.first + p.second * p.second;
    if (n & 1)
        return {d, c + d};
    else
        return {c, d};
}
```

위의 코드는 $O(\log n)$ 시간에 $F_n$ 과 $F_{n+1}$ 를 쌍으로 반환한다.

## 모듈로 p 에서의 주기성

모듈로 $p$ 에서의 피보나치 수열을 고려해보자. 이 수열이 주기성을 가짐을 보일 것이며, 주기는 $F_1 = 1$ 로 시작함을 보일 것이다 (다시 말해 주기가 시작되기 전의 수는 $F_0$ 가 유일하다).

모순을 통하여 수열의 주기성을 증명할 것이다. 모듈로 $p$ 에서의 피보나치 수열에서 처음부터 $p^2 + 1$ 개의 쌍에 대해 고려해보자:

$$
(F_1,\ F_2),\ (F_2,\ F_3),\ \ldots,\ (F_{p^2 + 1},\ F_{p^2 + 2})
$$

모듈러 $p$ 에서는 $p$ 개의 다른 나머지만이 존재할 수 있고, 이것이 쌍을 이루면 서로 다른 $p^2$ 개의 나머지쌍이 있으므로, 위의 쌍들 중 최소 두쌍이 서로 동일한 나머지를 가진다. 따라서 수열은 주기성을 가진다.

위의 쌍들 중 나머지가 동일한 두개의 쌍을 고르고 이것들을 각각 $(F_a,\ F_{a + 1})$ , $(F_b,\ F_{b + 1})$ 라고 하자. $a = 1$ 임을 보일 것이다. 만약 이것이 거짓이라면, 피보나치 수열의 성질에 의해 서로 동일한 이전의 쌍 $(F_{a-1},\ F_a)$ 과 $(F_{b-1},\ F_b)$ 이 존재할 것이다. 그러나, 쌍을 고를 때 이미 가장 작은 인덱스를 가지는 쌍을 골랐기 때문에 이는 모순이다. 따라서 증명은 끝나게 된다.

## 연습 문제

- [SPOJ - Euclid Algorithm Revisited](http://www.spoj.com/problems/MAIN74/)
- [SPOJ - Fibonacci Sum](http://www.spoj.com/problems/FIBOSUM/)
- [HackerRank - Is Fibo](https://www.hackerrank.com/contests/codesprint5/challenges/is-fibo/problem)
- [Project Euler - Even Fibonacci numbers](https://www.hackerrank.com/contests/projecteuler/challenges/euler002/problem)
- [DMOJ - Fibonacci Sequence](https://dmoj.ca/problem/fibonacci)
- [DMOJ - Fibonacci Sequence (Harder)](https://dmoj.ca/problem/fibonacci2)
