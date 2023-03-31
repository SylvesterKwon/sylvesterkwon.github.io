---
title: Euclidean algorithm for computing the greatest common divisor
mathjax: true
date: 2021-12-25 13:22:00
tags: e-maxx-kor, algebra
---

> 본 포스트는 [e-maxx.ru/algo](http://e-maxx.ru/algo/) 의 영문 번역본인 [cp-algorithms (e-maxx-eng)](https://cp-algorithms.com/index.html) 를 한국어로 번역한 것입니다. e-maxx 포스트의 저자는 [иванов максим](https://e-maxx.ru/about.php) 이며, cp-algorithms 포스트의 기여자는 [여기서](https://github.com/e-maxx-eng/e-maxx-eng/commits/master/src/algebra/euclid-algorithm.md) 확인하실 수 있습니다. 본 포스트는 CC-BY-SA-4.0 License를 따릅니다.

# 최대공약수 계산을 위한 유클리드 호제법

음이 아닌 두 정수 $a$ 와 $b$ 가 주어졌을 때, 두 수의  **최대공약수** (greatest common divisor, GCD), 즉 두 수의 약수이면서 가장 큰 수를 구해야한다. 이는 흔히 $\gcd(a, b)$ 로 표기된다. 수학적으로 이는 다음과 같이 정의된다: 
$$\gcd(a, b) = \max_ {k = 1 \dots \infty ~ : ~ k \mid a ~ \wedge k ~ \mid b} k.$$
(여기서 기호 "$\mid$" 는 약수를 나타낸다, 다시 말해, "$k \mid a$" 는 "$k$ 는 $a$ 의 약수" 임을 의미한다)

만약 두 수중 하나가 0이고, 하나가 0이 아니면 두 수의 최대공약수는 정의에 의해서 두번째 수이다. 만약 두 수가 모두 0인 경우에는 최대공약수가 정의되어 있지 않지만 (임의의 모든 큰 숫자가 될 수 있다), 하지만 그것을 0으로 정의할 수 있다. 이것은 상황을 더 간단하게 만들어 주는데, 만약 두 수중 하나라도 0이라면 두 수의 최대공약수는 나머지 한 수이다.

아래에서 다뤄질 유클리드 호제법을 사용하면 $a$ 와 $b$ 의 최대공약수를 $O(\log \min(a, b))$ 안에 찾을 수 있다.

이 알고리즘은 기원전 300년 경에 유클리드의 원론 (영어: Elements, 그리스어: Στοιχεῖα) 에서 처음 묘사되었지만, 그 이전에 개발되었을 가능성도 있다.

## 알고리즘

알고리즘은 아주 간단하다:

$$\gcd(a, b) = \begin{cases}a,&\text{if }b = 0 \\\\ \gcd(b, a \bmod b),&\text{otherwise.}\end{cases}$$

## 구현

```cpp
int gcd (int a, int b) {
    if (b == 0)
        return a;
    else
        return gcd (b, a % b);
}
```

C++의 삼항 연산자를 사용한다면, 이것을 한줄에 작성할 수 있다.

```cpp
int gcd (int a, int b) {
    return b ? gcd (b, a % b) : a;
}
```

그리고 다음은 비재귀 방식을 이용한 구현이다:

```cpp
int gcd (int a, int b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}
```

## 정당성 증명

우선, 유클리드 호제법의 매 단계마다 두번째 인수가 강감소함을 주목하라, 또한 이 알고리즘의 인수는 음수가 아니여야 하기 때문에 알고리즘은 항상 종료됨을 알 수 있다.

이 알고리즘의 정당성을 증명하기 위하여, 모든 $a \geq 0$, $b > 0$ 에 대하여 $\gcd(a, b) = \gcd(b, a \bmod b)$ 가 성립함을 보여야한다.

식의 우변이 좌변으로 나누어 떨어지고, 그 반대도 동일하다는 것을 보일것이다. 자명하게도, 이것은 좌변과 우변이 같다는 것을 의미하며 이를 이용하여 유클리드 호제법을 증명할 것이다.

$d = \gcd(a, b)$ 라고 하면, 정의에 의해서 $d\mid a$ 와 $d\mid b$ 이다.

$a$ 를 $b$ 로 나눈 나머지를 다음과 같이 표시한다:
$$a \bmod b = a - b \cdot \Bigl\lfloor\dfrac{a}{b}\Bigr\rfloor$$

이것으로 $d \mid (a \bmod b)$ 가 성립함을 알 수 있고, 다음과 같은 약수-배수 관계를 알 수 있다:
$$\begin{cases}d \mid b,\\\\ d \mid (a \mod b)\end{cases}$$

어떤 세 숫자 $p$, $q$, $r$ 에 대하여, 만약 $p\mid q$ 이고, $p\mid r$ 이면 $p\mid \gcd(q, r)$ 이라는 사실을 이용할 것이다. 이것을 이 문제에 적용시키면, 다음을 얻을 수 있다:
$$d = \gcd(a, b) \mid \gcd(b, a \mod b)$$

따라서 원래 식의 우변을 좌변으로 나누면 나누어 떨어짐을 보였다. 나머지 절반의 증명도 비슷하게 할 수 있다.

## 시간 복잡도

알고리즘의 수행 시간은 라메의 정리 (Lamé's theorem)를 통해 예상되었는데, 이것은 유클리드 호제법과 피보나치 수열 사이의 놀라운 연관성을 확립한다:

만약 어떤 $n$ 에 대하여 $a > b \geq 1$ , $b < F_n$ 이라면, 유클리드 호제법은 최대 $n-2$ 번의 재귀 호출을 수행할 것이다.

게다가, 이 정리의 상한이 최적이라는 것을 보일 수 있다. $a = F_n$ 그리고 $b = F_{n-1}$ 일 때, $gcd(a, b)$ 는 정확히 $n-2$ 재귀 호출을 수행한다. 다시 말해서 피보나치 수열에 포함된 수들은 유클리드 호제법의 최악의 케이스가 된다.

피보나치 수는 기하급수적으로 증가하기 때문에, 유클리드 호제법이 $O(\log \min(a, b))$ 안에 동작한다는 것을 알 수 있다.

## 최소공배수

최소공배수 (least common multiple, LCM) 를 계산하는 문제는 다음과 같은 간단한 공식을 사용하여 최대공약수 계산 문제로 축소됨을 보일 수 있다:
$$\text{lcm}(a, b) = \frac{a \cdot b}{\gcd(a, b)}$$

따라서 최소공배수도 유클리드 호제법을 사용하여 같은 시간 복잡도에 계산할 수 있다:

가능한 구현으로는, 먼저 $a$ 를 최대공약수로 나눔으로써 정수 오버플로우를 피하는 방법이 있다:

```cpp
int lcm (int a, int b) {
    return a / gcd(a, b) * b;
}
```

## 이진 최대공약수 알고리즘

이진 최대공약수 알고리즘은 일반적인 유클리드 호제법을 최적화한 것이다.

기존 알고리즘에서 가장 느린 부분은 모듈로 연산이다. 우리는 모듈로 연산이 $O(1)$ 에 동작한다고 생각하지만, 모듈로 연산은 덧셈, 뺄셈이나 비트 연산과 같은 더 단순한 연산보다 많이 느리다. 그래서 모듈로 연산의 사용은 가능한 피하는 것이 좋다.

사실은, 모듈러 연산을 사용하지 않으면서 더 빠른 최대공약수 알고리즘을 만들 수 있다.
다음과 같은 몇개의 특징에 기반하고 있다:

  - 만약 두 수 모두 짝수라면 두 수에서 2를 나누고 나머지 두 수의 최대공약수를 계산할 수 있다: $\gcd(2a, 2b) = 2 \gcd(a, b)$.
  - 만약 한 수는 짝수이고 나머지 수는 홀수라면 짝수인 수에서 2를 나누고 나머지 두 수의 최대공약수를 계산할 수 있다: $\gcd(2a, b) = \gcd(a, b)$ if $b$ is odd.
  - 만약 두 수 모두 홀수라면, 어떤 한 수 에서 다른 한수를 뺀 후 나머지 두 수의 최대공약수를 계산할 수 있다 : $\gcd(a, b) = \gcd(b, a-b)$ (이것은 기존의 유클리드 호제법의 정당성 증명과 같은 방식으로 증명될 수 있다.)

이러한 특성과 GCC의 빠른 속도의 비트 함수를 사용한다면 더 빠른 버전의 함수를 구현할 수 있다:

```cpp
int gcd(int a, int b) {
    if (!a || !b)
        return a | b;
    unsigned shift = __builtin_ctz(a | b);
    a >>= __builtin_ctz(a);
    do {
        b >>= __builtin_ctz(b);
        if (a > b)
            swap(a, b);
        b -= a;
    } while (b);
    return a << shift;
}
```

참고: 실제로 위와 같은 최적화는 대부분의 상황에서는 필요하지 않고, 대부분의 프로그래밍 언어는 이미 GCD 함수가 표준 라이브러리에 포함되어 있다. (예: C++17 은 `numeric` 헤더에 GCD 함수를 가지고 있다)

## 연습 문제

- [Codechef - GCD and LCM](https://www.codechef.com/problems/FLOW016)
