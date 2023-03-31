---
title: 확장 유클리드 호제법
mathjax: true
date: 2021-12-25 14:16:00
tags: e-maxx-kor, algebra
---

> 본 포스트는 [e-maxx.ru/algo](http://e-maxx.ru/algo/) 의 영문 번역본인 [cp-algorithms (e-maxx-eng)](https://cp-algorithms.com/index.html) 를 한국어로 번역한 것입니다. e-maxx 포스트의 저자는 [иванов максим](https://e-maxx.ru/about.php) 이며, cp-algorithms 포스트의 기여자는 [여기서](https://github.com/e-maxx-eng/e-maxx-eng/commits/master/src/algebra/extended-euclid-algorithm.md) 확인하실 수 있습니다. 본 포스트는 CC-BY-SA-4.0 License를 따릅니다.

# 확장 유클리드 호제법 (Extended Euclidean Algorithm)

[유클리드 호제법](./euclid-algorithm.html) 이 두 정수 $a$ 와 $b$ 사이의 최대공약수 (GCD) 만을 계산할 때, 확장 유클리드 호제법 (또는 확장 유클리드 알고리즘) 또한 마찬가지로 최대공약수를 표현할 수 있는 방법이 있는데, 다음 식에서 $a$ 와 $b$ 에 대하여, 즉, 계수 $x$ 와 $y$ 를 이용하여 나타낼 수 있다:

$$a \cdot x + b \cdot y = \gcd(a, b)$$

여기서 중요한 것은 언제나 위와 같은 표현을 찾을 수 있다는 것이다. 예를 들어서, $\gcd(55, 80) = 5$ 이기 때문에, 우리는 $5$ 를 항 $55$ 와 $80$ 에 대한 선형결합을 사용하여 나타낼 수 있다: $55 \cdot 3 + 80 \cdot (-2) = 5$ 

이 문제의 보다 일반적인 형태는 [선형 디오판토스 방정식 (Linear Diophantine Equations)](./linear-diophantine-equation.html)에서 다루고 있다. 
그것은 여기서 다루고 있는 알고리즘을 기반으로 할 것이다. 

## 알고리즘

이 섹션에서는 $a$ 와 $b$ 에 대한 최대공약수를 $g$ 라고 표기할 것이다.

기존의 유클리드 호제법에서 아주 간단한 변형만 하면 된다. 유클리드 호제법을 다시 떠올려 보면, 알고리즘은 항상 $b = 0$ 와 $a = g$ 인 상태에서 끝나는 것을 알 수 있다. 이런 매개변수에 대해서는 쉽게 방정식의 계수를 찾을 수 있는데, $g \cdot 1 + 0 \cdot 0 = g$ 라고 할 수 있다. 

$(x, y) = (1, 0)$ 계수에서 시작해서, 재귀 호출을 역으로 추적해볼 것이다. 여기서는 계수 $x$ 와 $y$ 가 $(a, b)$ 가 $(b, a \bmod b)$ 로 변하는 동안 어떻게 변하는 지만 알면 된다. 

$(b, a \bmod b)$ 단계의 계수 $(x_1, y_1)$ 를 찾았다고 가정해보자:

$$b \cdot x_1 + (a \bmod b) \cdot y_1 = g$$

그리고 $(a, b)$ 를 위한 쌍 $(x, y)$ 을 찾고 싶다:

$$ a \cdot x + b \cdot y = g$$

우리는 $a \bmod b$ 를 다음과 같이 나타낼 수 있다:

$$ a \bmod b = a - \left\lfloor \frac{a}{b} \right\rfloor \cdot b$$

계수 $(x_1, y_1)$ 에 대한 방정식에 위의 표현을 대입하면 다음과 같다:

$$ g = b \cdot x_1 + (a \bmod b) \cdot y_1 = b \cdot x_1 + \left(a - \left\lfloor \frac{a}{b} \right\rfloor \cdot b \right) \cdot y_1$$

그리고 식을 정리하면 다음과 같다:

$$g = a \cdot y_1 + b \cdot \left( x_1 - y_1 \cdot \left\lfloor \frac{a}{b} \right\rfloor \right)$$

따라서 $x$ 와 $y$ 의 값을 다음과 같이 구할 수 있다:

$$\begin{cases}
x = y_1 \\\\
y = x_1 - y_1 \cdot \left \lfloor \frac{a}{b} \right \rfloor
\end{cases} $$

## 구현

```cpp extended_gcd
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
```

위의 재귀 함수는 최대공약수를 반환하고, `x` 와 `y` 를 이용하여 계수들도 반환한다 (이는, 함수에서 call by reference로 전달된다).

이 구현을 사용한 확장 유클리드 호제법은 음수 정수들에 대해서도 올바른 결과를 얻을 수 있다.

## 반복문을 사용한 구현

확장 유클리드 호제법을 반복문만 사용해서 구현할 수도 있다. 
재귀 호출을 피하였기 때문에, 재귀를 사용한 구현보다 더 빠르게 동작할 것이다.

```cpp extended_gcd_iter
int gcd(int a, int b, int& x, int& y) {
    x = 1, y = 0;
    int x1 = 0, y1 = 1, a1 = a, b1 = b;
    while (b1) {
        int q = a1 / b1;
        tie(x, x1) = make_tuple(x1, x - q * x1);
        tie(y, y1) = make_tuple(y1, y - q * y1);
        tie(a1, b1) = make_tuple(b1, a1 - q * b1);
    }
    return a1;
}
```

변수 `a1` 와 `b1` 를 자세히 들여다 보면, 이들이 일반적인 [유클리드 호제법](./euclid-algorithm.html) 의 반복문을 사용한 구현과 똑같은 값들을 취하고 있다는 것을 확인할 수 있다. 그래서 알고리즘이 올바른 최대공약수를 구하고 있다는 것은 알 수 있다.

그리고 마찬가지로 알고리즘이 올바른 계수들을 계산하고 있다는 것을 보일려면, while 문 이전과 각 반복의 끝부분에서 언제나 성립하는 불변성을 확인하면 된다: $x \cdot a + y \cdot b = a_1$ 그리고 $x_1 \cdot a + y_1 \cdot b = b_1$.  
처음에 두 방정식이 성립함을 보이는 것은 쉽다. 
그리고 루프문의 매 반복에서도 이 등식이 성립함을 확인할 수 있다. 

끝부분에서는 $a_1$ 가 최대공약수를 포함하는 것을 알고 있으므로, 따라서 $x \cdot a + y \cdot b = g$ 이다. 
이것은 우리가 필요했던 계수들을 찾았음을 의미한다. 

이 코드는 최적화의 여지가 아직 남아 있는데, 코드에서 변수 $a_1$ 와 $b_1$ 를 제거하고 $a$ 와 $b$ 를 재사용하면 된다. 
그러나 만약에 이렇게 할 경우 앞서 언급했던 불변성을 주장할 수 없다. 

## 연습 문제

* [10104 - Euclid Problem](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1045)
* [GYM - (J) Once Upon A Time](http://codeforces.com/gym/100963)
* [UVA - 12775 - Gift Dilemma](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4628)
