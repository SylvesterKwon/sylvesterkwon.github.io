---
title: 모듈로 곱셈 역원
mathjax: true
date: 2021-12-28 21:55:00
tags: e-maxx-kor, algebra
---

# 모듈로 곱셈 역원

## 정의

정수 $a$의 [모듈로 곱셈 역원](http://en.wikipedia.org/wiki/Modular_multiplicative_inverse)은 어떤 모듈로 $m$에 대해 $a \cdot x$가 1과 합동이 되도록 하는 정수 $x$이다.
형식적으로 쓰면, $a$의 모듈로 곱셈 역원은 다음 합동식을 만족하는 정수 $x$를 일컫는다:
$$
a \cdot x \equiv 1 \mod m.
$$
이러한 $x$를 $a^{-1}$으로 표기한다.

모듈로 곱셈 역원은 존재하지 않을 수도 있다. 예를 들어, $m = 4$, $a = 2$인 경우, 모듈로 $m$에 대해 $x$에 어떤 값을 대입하더라도 합동식이 성립하지 않음을 알 수 있고, 따라서 위 합동식을 만족하는 정수 $a^{-1}$는 존재하지 않는다.
모듈로 곱셈 역원의 존재성은 $a$와 $m$이 서로소임과 동치임을 증명할 수 있다.

이 글에서는 모듈로 곱셈 역원이 존재하는 경우에 그것을 찾는 방법 두 가지와, 선형 시간에 모든 수의 모듈로 곱셈 역원을 계산하는 방법 한 가지를 소개한다.

## 확장 유클리드 호제법을 사용하여 모듈로 역원 계산하기

미지수 $x$, $y$에 대한 다음 방정식을 생각하자:

$$
a \cdot x + m \cdot y = 1
$$

이는 [이변수 일차 디오판토스 방정식](./algebra/linear-diophantine-equation.html)이다.
링크된 글에 알 수 있듯이, $\gcd(a, m) = 1$인 경우 방정식은 해를 가지고, 이를 [확장 유클리드 알고리즘](http://en.wikipedia.org/wiki/Extended_Euclidean_algorithm)을 통해 계산할 수 있다.
$\gcd(a, m) = 1$는 모듈로 역원이 존재하기 위한 조건이기도 하다.

양변에 모듈로 $m$을 취하면 $m \cdot y$는 사라지고 다음 합동식을 얻는다:

$$
a \cdot x \equiv 1 \mod m
$$

따라서, $a$의 모듈로 역원은 $x$이다.

구현은 다음과 같다:

```cpp
int x, y;
int g = extended_euclidean(a, m, x, y);
if (g != 1) {
    cout << "No solution!";
}
else {
    x = (x % m + m) % m;
    cout << x << endl;
}
```

`x`를 수정하는 방법에 주목하자.
확장 유클리드 호제법의 결과  `x`는 음수가 될 수 있기 때문에 `x % m` 또한 음수가 될 수 있으므로 우선 `m`을 더하여 `x`를 양수로 만들었다.

## 이진 거듭제곱을 통해 모듈로 역원 계산하기

모듈로 역원을 찾는 다른 방법은 오일러 정리를 이용하는 것이다. $a$와 $m$인 경우 다음 합동식이 성립한다.

$$
a^{\phi (m)} \equiv 1 \mod m
$$

$\phi$는 [오일러 피 함수](./algebra/phi-function.html)이다.
$a$와 $m$가 서로소임은 모듈로 역원이 존재하기 위한 조건이다.

$m$이 소수인 경우, 좀 더 간단한 [페르마의 소정리](http://en.wikipedia.org/wiki/Fermat's_little_theorem)가 된다:

$$
a^{m - 1} \equiv 1 \mod m
$$

방정식의 양변에 $a^{-1}$를 곱하여 다음 사실을 관찰하자:

* $a$와 서로소인 $m$에 대해 $a ^ {\phi (m) - 1} \equiv a ^{-1} \mod m$이 성립한다.
* 특히 $m$이 소수인 경우 $a ^ {m - 2} \equiv a ^ {-1} \mod m$이 성립한다.

위 결과를 사용하면, [이진 거듭제곱](./algebra/binary-exp.html)을 사용하여 $O(\log m)$ 시간 복잡도로 모듈로 역원을 쉽게 계산할 수 있다.

이전 절에서 소개된 방법보다 이해하기 쉽지만, $m$이 소수가 아닌 경우 오일러 피 함수를 계산하기 어려울 수 있다. $m$을 소인수분해해야 하기 때문이다. $m$의 소인수분해를 알고 있는 경우에, 이 방법의 시간 복잡도는 $O(\log m)$이다.

## 모든 수에 대해 모듈로 역원 계산하기

$m$이 주어졌을 때, $[1, m - 1]$ 범위에 있는 모든 수에 대해 모듈로 역원을 계산하고자 한다.

이전 절에서 소개된 알고리즘을 사용하면 $O(m \log m)$ 계산 복잡도로 답을 얻을 수 있다.

$O(m)$ 계산 복잡도를 갖는 알고리즘을 소개한다. $m$이 소수인 경우에만 사용할 수 있다.

$i$의 모듈로 역원을 $\text{inv}[i]$으로 표기하면, $i > 1$에 대해 다음 등식이 성립한다.

$$
\text{inv}[i] = - \left\lfloor \frac{m}{i} \right\rfloor \cdot \text{inv}[m \bmod i] \bmod m
$$

따라서 구현은 아주 간단하다.

```cpp
inv[1] = 1;
for(int i = 2; i < m; ++i)
    inv[i] = m - (m/i) * inv[m%i] % m;
```

### 증명

다음을 관찰하자.
$$
m \bmod i = m -  \left\lfloor \frac{m}{i} \right\rfloor \cdot i
$$
양변에 모듈로 $m$을 취하여 다음 등식을 얻는다.
$$
m \bmod i \equiv - \left\lfloor \frac{m}{i} \right\rfloor \cdot i \mod m
$$
양 변에 $i^{-1} \cdot (m \bmod i)^{-1}$를 곱하여 다음 등식을 얻는다.
$$
(m \bmod i) \cdot i^{-1} \cdot (m \bmod i)^{-1} \equiv -\left\lfloor \frac{m}{i} \right\rfloor \cdot i \cdot i^{-1} \cdot (m \bmod i)^{-1} \mod m
$$
이를 간단하게 쓰면 다음과 같다.
$$
i^{-1} \equiv -\left\lfloor \frac{m}{i} \right\rfloor \cdot (m \bmod i)^{-1} \mod m,
$$



## 연습 문제

* [UVa 11904 - One Unit Machine](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=3055)
* [Hackerrank - Longest Increasing Subsequence Arrays](https://www.hackerrank.com/contests/world-codesprint-5/challenges/longest-increasing-subsequence-arrays)
* [Codeforces 300C - Beautiful Numbers](http://codeforces.com/problemset/problem/300/C)
* [Codeforces 622F - The Sum of the k-th Powers](http://codeforces.com/problemset/problem/622/F)
* [Codeforces 717A - Festival Organization](http://codeforces.com/problemset/problem/717/A)
* [Codeforces 896D - Nephren Runs a Cinema](http://codeforces.com/problemset/problem/896/D)
