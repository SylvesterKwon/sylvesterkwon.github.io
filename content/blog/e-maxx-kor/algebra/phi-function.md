---
title: 오일러 피 함수
mathjax: true
date: 2021-12-26 20:48:00
tags: e-maxx-kor, algebra
---

> 본 포스트는 [e-maxx.ru/algo](http://e-maxx.ru/algo/) 의 영문 번역본인 [cp-algorithms (e-maxx-eng)](https://cp-algorithms.com/index.html) 를 한국어로 번역한 것입니다. e-maxx 포스트의 저자는 [иванов максим](https://e-maxx.ru/about.php) 이며, cp-algorithms 포스트의 기여자는 [여기서](https://github.com/e-maxx-eng/e-maxx-eng/commits/master/src/algebra/phi-function.md) 확인하실 수 있습니다. 본 포스트는 CC-BY-SA-4.0 License를 따릅니다.

# 오일러 피 함수

**오일러 피 함수 (Euler’s phi (totient) function))** $\phi(n)$는 1부터 $n$까지의 정수 중 $n$과 서로소인 것의 개수를 세는 함수이다. 두 수의 최대공약수가 1일 때, 두 수는 서로소이다(1은 모든 수와 서로소인 것으로 간주된다).

처음 몇 개의 자연수에 대해 $\phi(n)$의 값은 다음과 같다:

$$
\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|}
\hline
n & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 & 13 & 14 & 15 & 16 & 17 & 18 & 19 & 20 & 21 \\ \hline
\phi(n) & 1 & 1 & 2 & 2 & 4 & 2 & 6 & 4 & 6 & 4 & 10 & 4 & 12 & 6 & 8 & 8 & 16 & 6 & 18 & 8 & 12 \\ \hline
\end{array}
$$

## 성질

오일러 피 함수의 다음 성질들을 이용하여 모든 수에 대해 오일러 피 함수를 계산할 수 있다.

- $p$가 소수일 때, 모든 $1 \le q < p$에 대해 $\gcd(p, q) = 1$이다. 따라서 다음 등식을 얻는다:
  $$\phi (p) = p - 1.$$

- $p$가 소수이고 $k \ge 1$일 때, $1$부터 $p^k$까지의 수 중 정확히 $p^k / p$개가 $p$로 나누어 떨어진다. 따라서 다음 등식을 얻는다:
  $$\phi(p^k) = p^k - p^{k-1}.$$

<ul><li>
    $a$, $b$가 서로소일 때, 다음 등식을 얻는다:
    $$\phi(a b) = \phi(a) \cdot \phi(b).$$
    이 관계는 자명해 보이지 않는다. 이 결과는 <a href="./chinese-remainder-theorem.html">중국인 나머지 정리</a>로부터 알 수 있는데, 중국인 나머지 정리에 의해 각 $0 \le x < a$, $0 \le y < b$에 대해 $z \equiv x \pmod{a}$, $z \equiv y \pmod{b}$를 만족하는 유일한 $0 \le z < a b$가 존재한다. $z$가 $a b$과 서로소임은 $x$가 $a$와 서로소이고 $y$가 $b$와 서로소임과 동치이다. 따라서 $a b$와 서로소인 정수의 개수는 $\varphi(a)$, $\varphi(b)$의 곱과 같다.
</li>

<li>
서로소가 아닌 두 수 $a$, $b$에 대해서, 등식
$$\phi(ab) = \phi(a) \cdot \phi(b) \cdot \dfrac{d}{\phi(d)}$$
이 성립한다. 이때, $d = \gcd(a, b)$이다.
</li>
</ul>

처음 세 성질과 $n$의 소인수분해를 이용하여 $\phi(n)$를 계산할 수 있다. $n = {p_1}^{a_1} \cdot {p_2}^{a_2} \cdots {p_k}^{a_k}$, $p_i$는 각각 소수일 때, 다음 등식이 성립한다.

$$
\begin{align*}
\phi (n) &= \phi ({p_1}^{a_1}) \cdot \phi ({p_2}^{a_2}) \cdots  \phi ({p_k}^{a_k}) \\
&= \left({p_1}^{a_1} - {p_1}^{a_1 - 1}\right) \cdot \left({p_2}^{a_2} - {p_2}^{a_2 - 1}\right) \cdots \left({p_k}^{a_k} - {p_k}^{a_k - 1}\right) \\
&= p_1^{a_1} \cdot \left(1 - \frac{1}{p_1}\right) \cdot p_2^{a_2} \cdot \left(1 - \frac{1}{p_2}\right) \cdots p_k^{a_k} \cdot \left(1 - \frac{1}{p_k}\right) \\
&= n \cdot \left(1 - \frac{1}{p_1}\right) \cdot \left(1 - \frac{1}{p_2}\right) \cdots \left(1 - \frac{1}{p_k}\right)
\end{align*}
$$

## 구현

$O(\sqrt{n})$ 계산 복잡도의 소인수분해를 사용한 구현:

```cpp
int phi(int n) {
    int result = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            while (n % i == 0)
                n /= i;
            result -= result / i;
        }
    }
    if (n > 1)
        result -= result / n;
    return result;
}
```

## $1$부터 $n$까지 오일러 피 함수 구하기: $O(n \log log{n})$ 계산 복잡도

만약 $1$부터 $n$까지의 모든 수에 대해 오일러 피 함수값이 필요하다면, 각각의 수 $n$개를 모두 소인수분해하는 것은 효율적이지 않다.
[에라토스테네스의 체](algebra/sieve-of-eratosthenes.html)에서 썼던 아이디어를 적용할 수 있다. 위에서 보인 성질을 사용할 것이지만, 각각의 수에 대해 각 소인수마다 중간 결과를 갱신하는 대신, 우선 모든 소수를 찾은 후 각 소수에 대해 그로 나누어 떨어지는 모든 수에 대해 중간 결과를 갱신하는 방법을 사용한다.

이러한 접근은 근본적으로 에라토스테네스의 체와 같기 때문에, 계산 복잡도 또한 $O(n \log \log n)$으로 같다.

```cpp
void phi_1_to_n(int n) {
    vector<int> phi(n + 1);
    phi[0] = 0;
    phi[1] = 1;
    for (int i = 2; i <= n; i++)
        phi[i] = i;

    for (int i = 2; i <= n; i++) {
        if (phi[i] == i) {
            for (int j = i; j <= n; j += i)
                phi[j] -= phi[j] / i;
        }
    }
}
```

## 약수 합 성질

이 흥미로운 성질은 가우스에 의해 확립되었다:

$$ \sum\_{d|n} \phi{(d)} = n$$

합은 $n$의 모든 약수 $d$에 대해 더한 것이다.

예를 들어, 10의 약수는 1, 2, 5, 10이다. $\phi(1) + \phi(2) + \phi(5) + \phi(10) = 1 + 1 + 4 + 4 = 10$이 성립한다.

### 약수 합 성질을 이용하여 1부터 $n$까지 오일러 피 함수값을 계산하기

약수 합 성질은 1부터 $n$까지의 모든 오일러 피 함수값을 계산하는데 사용될 수 있다. 이 구현은 에라토스테네스의 체를 이용한 이전 구현보다 약간 더 간단하지만, 약간 더 나쁜 계산 복잡도인 $O(n \log n)$을 갖는다.

```cpp
void phi_1_to_n(int n) {
    vector<int> phi(n + 1);
    phi[0] = 0;
    phi[1] = 1;
    for (int i = 2; i <= n; i++)
        phi[i] = i - 1;

    for (int i = 2; i <= n; i++)
        for (int j = 2 * i; j <= n; j += i)
              phi[j] -= phi[i];
}
```

## 오일러 정리에서의 응용

오일러 피 함수의 가장 유명하고 중요한 성질은 **오일러 정리**에서 나타난다. $a$와 $m$이 서로소일때, 다음 등식이 성립한다.
$$a^{\phi(m)} \equiv 1 \pmod m$$

$m$이 소수인 경우, 오일러 정리는 **페르마의 소정리**가 된다:
$$a^{m - 1} \equiv 1 \pmod m$$

오일러 정리와 오일러 피 함수는 [잉여 역수](./algebra/module-inverse.html)를 계산하는 데 활용되는 등 실전에서 자주 등장한다.

직접적인 결과로써 다음 합동식이 성립한다:
$$a^n \equiv a^{n \bmod \phi(m)} \pmod m$$
이 합동식을 통해 아주 큰 $n$에 대해 $x^n \bmod m$을 계산할 수 있다. 특히 $n$이 다른 계산의 결과인 경우, $n$을 법 $\phi(m)$에 대해 계산하여도 된다.

## 일반화

서로소가 아닌 $x$, $m$에 대해 $x^n \bmod m$을 효율적으로 계산하는 마지막 합동식의 잘 알려지지 않은 변형이 있다. 임의의 $x, m$와 $n \geq \log_2 m$에 대해 다음 합동식이 성립한다.
$$x^{n}\equiv x^{\phi(m)+[n \bmod \phi(m)]} \mod m$$

증명:

$p_1, \dots, p_t$를 $x$와 $m$ 공통 소인수라고 하고, $k_i$를 $p_i$가 $m$을 나누는 횟수라고 하자.
$a = p_1^{k_1} \dots p_t^{k_t}$으로 정의하면 $\frac{m}{a}$와 $x$는 서로소이다.
$a$가 $x^k$를 나누도록 하는 정수 중 가장 작은 것을 $k$라고 하자.
$n \ge k$를 가정하면 다음과 같이 쓸 수 있다:

$$
\begin{align*}x^n \bmod m &= \frac{x^k}{a}ax^{n-k}\bmod m \\
&= \frac{x^k}{a}\left(ax^{n-k}\bmod m\right) \bmod m \\
&= \frac{x^k}{a}\left(ax^{n-k}\bmod a \frac{m}{a}\right) \bmod m \\
&=\frac{x^k}{a} a \left(x^{n-k} \bmod \frac{m}{a}\right)\bmod m \\
&= x^k\left(x^{n-k} \bmod \frac{m}{a}\right)\bmod m
\end{align*}
$$

세번째 줄과 네번째 줄 사이의 합동은 $ab \bmod ac = a(b \bmod c)$이므로 성립한다.
$b = cd + r$, $r < c$일 때, $ab = acd + ar$, $ar < ac$임을 관찰하자.

$x$와 $\frac{m}{a}$는 서로소이므로, 오일러 정리를 사용하여 다음 공식을 얻는다.
$$x^n \bmod m = x^k\left(x^{n-k \bmod \phi(\frac{m}{a})} \bmod \frac{m}{a}\right)\bmod m.$$
$k$가 아주 작으므로 (사실 $k \le \log_2 m$이다) 이는 효율적으로 계산할 수 있다.

이 공식은 적용하기 어렵지만, $x^n \bmod m$의 행동을 분석하기 위해 사용할 수 있다. 거듭제곱으로 이루어진 수열 $(x^1 \bmod m, x^2 \bmod m, x^3 \bmod m, \dots)$은 첫 $k$개의 항 이후 길이 $\phi\left(\frac{m}{a}\right)$인 순환에 진입한다. $a$, $\frac{m}{a}$는 서로소이므로 $\phi(a) \cdot \phi\left(\frac{m}{a}\right) = \phi(m)$를 얻는다. 특히, $\phi(m)$은 $\phi\left(\frac{m}{a}\right)$으로 나누어 떨어진다. 따라서 이 순환이 길이 $\phi(m)$를 갖는다고 말할 수도 있다. $\phi(m) \ge \log_2 m \ge k$으로부터, 목표했던 더욱 간단한 공식을 얻는다:
$$ x^n \equiv x^{\phi(m)} x^{(n - \phi(m)) \bmod \phi(m)} \bmod m \equiv x^{\phi(m)+[n \bmod \phi(m)]} \mod m.$$

## 연습문제

- [SPOJ #4141 "Euler Totient Function" [Difficulty: CakeWalk]](http://www.spoj.com/problems/ETF/)
- [UVA #10179 "Irreducible Basic Fractions" [Difficulty: Easy]](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1120)
- [UVA #10299 "Relatives" [Difficulty: Easy]](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1240)
- [UVA #11327 "Enumerating Rational Numbers" [Difficulty: Medium]](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2302)
- [TIMUS #1673 "Admission to Exam" [Difficulty: High]](http://acm.timus.ru/problem.aspx?space=1&num=1673)
- [UVA 10990 - Another New Function](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1931)
- [Codechef - Golu and Sweetness](https://www.codechef.com/problems/COZIE)
- [SPOJ - LCM Sum](http://www.spoj.com/problems/LCMSUM/)
- [GYM - Simple Calculations (F)](http://codeforces.com/gym/100975)
- [UVA 13132 - Laser Mirrors](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=5043)
- [SPOJ - GCDEX](http://www.spoj.com/problems/GCDEX/)
- [UVA 12995 - Farey Sequence](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4878)
- [SPOJ - Totient in Permutation (easy)](http://www.spoj.com/problems/TIP1/)
- [LOJ - Mathematically Hard](http://lightoj.com/volume_showproblem.php?problem=1007)
- [SPOJ - Totient Extreme](http://www.spoj.com/problems/DCEPCA03/)
- [SPOJ - Playing with GCD](http://www.spoj.com/problems/NAJPWG/)
- [SPOJ - G Force](http://www.spoj.com/problems/DCEPC12G/)
- [SPOJ - Smallest Inverse Euler Totient Function](http://www.spoj.com/problems/INVPHI/)
- [Codeforces - Power Tower](http://codeforces.com/problemset/problem/906/D)
