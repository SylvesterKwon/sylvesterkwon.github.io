---
title: 연립 일차 합동식 풀이
date: 2024-08-18 00:00:00
tags: etc
description: 연립 일차 합동식의 풀이 방법을 소개한다.
---

일반적인 연립합동식을 풀이하는 방법에 대해서 안내한다.

### $ax \equiv b \pmod m$ 꼴의 합동식이 주어졌을 때 $x\equiv c\pmod{m'}$ 꼴로의 변환

1. $a'x \equiv b' \pmod {m'}$, (여기서 $g=\gcd(a,m), a'=a/g, b'=b/g,m'=m/g$, 만약 $g \nmid b$ 라면, 해가 존재하지 않음)
2. $x \equiv {a'}^{-1}\cdot b' \pmod {m'}$ ($\gcd(a', m')=1$  이므로 역원이 존재하므로)

### 주어진 법들이 서로소라는 것이 보장되지 않는 경우

주어진 연립합동식에서 $x$ 의 1이 아닌 계수가 있다면 위 단락에서의 변환을 통해 식을 아래의 형태로 만든다. 이 단락에서는 $m_1, m_2$가 서로소임이 보장되지 않을때의 연립합동식 풀이를 다룬다.

$$
\begin{align}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2}
\end{align}
$$

여기서 첫번째 합동식에 의하여 다음과 같은 등식을 만들어낼 수 있다: $x = a_1 +m_1\cdot k$. 이 식을 위 연립 합동식의 두번째 식의 좌항에 대입한다.

$$
a_1+m_1\cdot k \equiv a_2 \pmod{m_2}
$$

최종적으로 식을 다음과 같이 고쳐쓸 수 있다:

$$
m_1 \cdot k \equiv a_2 - a_1 \pmod{m_2}
$$

이는 일반적인 $a\cdot x \equiv b \pmod m$ 꼴의 합동식이기 때문에 아래 합동식의 해 $k$ 는 확장유클리드 호제법을 사용하여 해의 존재성을 보일 수 있고, 해가 있다면 특정 해를 구해낼 수 있게 된다. $k$ 가 존재한다면 최초의 연립합동식의 해 $x$ 도 구해낼 수 있고, 중국인 나머지 정리에 의하여 법 $lcm(m_1, m_2)$ 아래에서 유일한 해라고 볼 수 있다. 

연립합동식이 2개 초과해서 주어졌으면 앞선 단계를 통해 두개의 연립합동식을 하나의 합동식으로 만들고 같은 단계를 귀납적으로 반복하면 된다.

## 연습 문제
- [Codeforces Round 484 (Div. 2) - E. Billiard](https://codeforces.com/contest/982/problem/E)
- [Codeforces Round 963 (Div. 2) - F2. Dyn-scripted Robot (Hard Version)](https://codeforces.com/contest/1993/problem/F2)
