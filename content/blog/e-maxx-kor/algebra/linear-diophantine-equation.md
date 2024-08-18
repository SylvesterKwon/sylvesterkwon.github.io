---
title: 선형 디오판토스 방정식
mathjax: true
date: 2021-12-26 16:14:00
tags: e-maxx-kor, algebra
---

> 본 포스트는 [e-maxx.ru/algo](http://e-maxx.ru/algo/) 의 영문 번역본인 [cp-algorithms (e-maxx-eng)](https://cp-algorithms.com/index.html) 를 한국어로 번역한 것입니다. e-maxx 포스트의 저자는 [иванов максим](https://e-maxx.ru/about.php) 이며, cp-algorithms 포스트의 기여자는 [여기서](https://github.com/e-maxx-eng/e-maxx-eng/commits/master/src/algebra/linear-diophantine-equation.md) 확인하실 수 있습니다. 본 포스트는 CC-BY-SA-4.0 License를 따릅니다.

# 선형 디오판토스 방정식

선형 디오판토스 방정식 (변수가 2개인) 은 다음과 같은 일반적인 형태의 방정식이다:

$$
ax + by = c
$$

여기서 $a$, $b$, $c$ 는 이미 주어진 정수이고, $x$, $y$ 는 정수인 미지수이다.

이 아티클에서는 이 방정식에서 잘 알려진 몇가지의 문제들을 고려할 것이다:

* 하나의 해 구하기
* 모든 해 구하기
* 주어진 구간에서 모든 해와 해의 개수찾기
* $x + y$ 가 최소가 되는 해 구하기

## 특수한 케이스

이 방정식의 특수한 케이스는 $a = b = 0$ 일때 나타난다. 이 경우에 무한히 많은 해를 가지거나 해가 존재하지 않음을 보이는 것은 쉬운데, 전자는 $c = 0$ 인 경우이고 후자는 그렇지 않은 경우이다. 이 아티클에서는 이러한 케이스들은 무시할 것이다.

## 방정식의 해 구하기

미지수가 2개인 디오판토스 방정식의 한 해를 구할 때, [확장 유클리드 호제법](algebra/extended-euclid-algorithm.html) 을 사용할 수 있다. 우선, $a$ 와 $b$ 의 부호가 음이 아니라고 가정하자. $a$ 와 $b$ 에 대해서 확장 유클리드 호제법을 사용하면 두 수에 대한 최대공약수 $g$ 를 찾을 수 있고, 다음과 같은 두 수 $x_g$ 와 $y_g$ 도 구할 수 있다:

$$
a x_g + b y_g = g
$$

만약 $c$ 가 $g = \gcd(a, b)$ 에 의해 나눠질 수 있다면 주어진 디오판토스 방정식은 해가 존재하고 그렇지 않은 경우는 해가 존재하지 않는다. 증명은 꽤 직관적인데, 두 수의 선형 결합은 그들의 공약수로 나눌 수 있기 때문이다.

그렇다면 $c$ 가 $g$ 에 의해 나누어진다고 가정해보자, 그렇다면 다음을 얻을 수 있다:

$$
a \cdot x_g \cdot \frac{c}{g} + b \cdot y_g \cdot \frac{c}{g} = c
$$

그러므로 다음은 디오판토스 방정식의 해들 중 하나라고 말할 수 있다:

$$
x_0 = x_g \cdot \frac{c}{g},
$$
$$
y_0 = y_g \cdot \frac{c}{g}.
$$

위의 아이디어는 $a$ 나 $b$ 가 음수이거나 둘다 음수이더라도 동작한다. 이런 경우, 필요할 때 $x_0$ 와 $y_0$ 의 부호를 적절히 변경해주기만 하면 된다.

마지막으로, 이 아이디어를 다음과 같이 구현할 수 있다 (참고로 이 코드는 $a = b = 0$ 인 경우는 고려하지 않는다):

```cpp linear_diophantine_any
int gcd(int a, int b, int& x, int& y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    int x1, y1;
    int d = gcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}

bool find_any_solution(int a, int b, int c, int &x0, int &y0, int &g) {
    g = gcd(abs(a), abs(b), x0, y0);
    if (c % g) {
        return false;
    }

    x0 *= c / g;
    y0 *= c / g;
    if (a < 0) x0 = -x0;
    if (b < 0) y0 = -y0;
    return true;
}
```

## 모든 해들을 구하기

하나의 해 $(x_0, y_0)$ 로부터 주어진 방정식의 모든 해들을 구할 수 있다.

$g = \gcd(a, b)$ 라고 하자, 그리고 다음을 만족하는 정수 $x_0, y_0$ 가 있다고 하자:

$$
a \cdot x_0 + b \cdot y_0 = c
$$

$x_0$ 에 $b / g$ 를 더하고, $y_0$ 에 $a / g$ 를 빼도 등식은 여전히 성립할 것이다:

$$
a \cdot \left(x_0 + \frac{b}{g}\right) + b \cdot \left(y_0 - \frac{a}{g}\right) = a \cdot x_0 + b \cdot y_0 + a \cdot \frac{b}{g} - b \cdot \frac{a}{g} = c
$$

자명하게도 위의 과정은 반복될 수 있고 , 주어진 디오판토스 방정식의 해들은 다음과 같이 나타낼 수 있다:

$$
x = x_0 + k \cdot \frac{b}{g}
$$
$$
y = y_0 - k \cdot \frac{a}{g}
$$

게다가, 이것은 주어진 디오판토스 방정식의 모든 가능한 경우의 집합이다.

## 주어진 구간에서 해와 해의 개수찾기

이전의 섹션에서 해들에 대한 어떠한 제한도 부과하지 않는다면 무한한 해가 존재할 것이라는 것을 분명히 해야한다. 그래서 이 섹션에서는 $x$ 와 $y$ 의 구간 제한을 추가한 후, 해들의 개수를 세고, 해들을 전부 나열할 것이다.

두가지 구간 $[min_x; max_x]$ 그리고 $[min_y; max_y]$ 이 있다. 이 두 구간안에 존재하는 해들만 찾을 것이다.

$a$ 나 $b$ 가 $0$ 이라면 유일한 해를 가지기 때문에 여기서는 이 케이스를 고려하지 않는다.

먼저, $x \ge min_x$ 를 만족하는 최소 $x$ 를 가지는 해를 찾을 것이다. 이것을 하려면 먼저 디오판토스 방정식의 아무 해를 찾고 $x \ge min_x$를 만족시키는 해를 구하기 위하여 앞서 구한  해를 "쉬프트" 한다 (이전 섹션의 모든 해를 찾는 방법을 이용). 이것은 $O(1)$ 에 수행될 수 있다. 이 최소 $x$ 를 $l_{x1}$ 로 표기하기로 하자.

비슷하게, $x \le max_x$ 를 만족하는 최대 $x$ 값을 구할 수 있다. 이 최대 $x$ 를 $r_{x1}$ 로 표기한다.

또, 최소 $y$ $(y \ge min_y)$ 와 최대 $y$ $(y \le max_y)$ 값을 구할 수 있다. 마찬가지로 이 값들을에 해당하는 $x$ 값을 각각 $l_{x2}$ 와 $r_{x2}$ 로 표기한다.

최종 해는 구간 $[l_{x1}, r_{x1}]$ 와 구간 $[l_{x2}, r_{x2}]$ 의 교집합이다. 이것을 $[l_x, r_x]$ 로 표기한다.

다음은 이 아이디어를 구현한 것이다. 처음에 $a$ 와 $b$ 를 $g$ 로 나눔을 주목하라. 방정식 $a x + b y = c$ 은 방정식 $\frac{a}{g} x + \frac{b}{g} y = \frac{c}{g}$ 과 동치이기 때문에, 후자를 사용하고 $\gcd(\frac{a}{g}, \frac{b}{g}) = 1$ 라고 생각할 수 있는데, 이는 공식을 더욱 간소화시킨다.

```cpp linear_diophantine_all
void shift_solution(int & x, int & y, int a, int b, int cnt) {
    x += cnt * b;
    y -= cnt * a;
}

int find_all_solutions(int a, int b, int c, int minx, int maxx, int miny, int maxy) {
    int x, y, g;
    if (!find_any_solution(a, b, c, x, y, g))
        return 0;
    a /= g;
    b /= g;

    int sign_a = a > 0 ? +1 : -1;
    int sign_b = b > 0 ? +1 : -1;

    shift_solution(x, y, a, b, (minx - x) / b);
    if (x < minx)
        shift_solution(x, y, a, b, sign_b);
    if (x > maxx)
        return 0;
    int lx1 = x;

    shift_solution(x, y, a, b, (maxx - x) / b);
    if (x > maxx)
        shift_solution(x, y, a, b, -sign_b);
    int rx1 = x;

    shift_solution(x, y, a, b, -(miny - y) / a);
    if (y < miny)
        shift_solution(x, y, a, b, -sign_a);
    if (y > maxy)
        return 0;
    int lx2 = x;

    shift_solution(x, y, a, b, -(maxy - y) / a);
    if (y > maxy)
        shift_solution(x, y, a, b, sign_a);
    int rx2 = x;

    if (lx2 > rx2)
        swap(lx2, rx2);
    int lx = max(lx1, lx2);
    int rx = min(rx1, rx2);

    if (lx > rx)
        return 0;
    return (rx - lx) / abs(b) + 1;
}
```

여기서 $l_x$ 와 $r_x$ 를 알기 때문에, 모든 해를 나열하는 것은 너무나도 간단하다. 모든 $k \ge 0$ 에 대하여 $x = r_x$ 일 때까지 $x = l_x + k \cdot \frac{b}{g}$ 를 반복하고 방정식 $a x + b y = c$ 를 사용하여 각각 해당되는 $y$ 값을 각각 구해주기만 하면 된다.

## $x + y$ 가 최소가 되는 해 구하기

이 섹션도 마찬가지로 $x$ 와 $y$ 에 대한 제한이 필요한데, 제한이 없다면 답은 음의 무한이 될 것이다.

아이디어는 이전의 섹션과 비슷하다: 디오판토스 방정식의 아무 해나 찾은 이후, 몇가지 조건을 만족시키기 위해 해를 "쉬프트" 할 것이다.

마침내, 최소값을 찾기 위해 모든 해의 집합을 찾는 방법을 사용한다:

$$
x' = x + k \cdot \frac{b}{g},
$$
$$
y' = y - k \cdot \frac{a}{g}.
$$

$x + y$ 는 다음과 같이 변화한다:

$$
x' + y' = x + y + k \cdot \left(\frac{b}{g} - \frac{a}{g}\right) = x + y + k \cdot \frac{b-a}{g}
$$

만약 $a < b$ 라면, 가능한 최소 $k$ 값을 선택해야할 것이다. 만약 $a > b$ 라면, 가능한 최대 $k$ 값을 선택해야할 것이다. 만약 $a = b$ 라면, 모든 해는 동일한 합 $x + y$ 를 가질 것이다.

## 연습 문제

* [Spoj - Crucial Equation](http://www.spoj.com/problems/CEQU/)
* [SGU 106](http://codeforces.com/problemsets/acmsguru/problem/99999/106)
* [Codeforces - Ebony and Ivory](http://codeforces.com/contest/633/problem/A)
* [Codechef - Get AC in one go](https://www.codechef.com/problems/COPR16G)
* [LightOj - Solutions to an equation](http://www.lightoj.com/volume_showproblem.php?problem=1306)
