---
title: USACO 2021 January Contest (Silver)
mathjax: true
date: 2021-04-27 18:29:30
tags: USACO
---
## Dance Mooves

[BOJ#20970](https://www.acmicpc.net/problem/20970)

line에서의 각 위치들을 정점집합으로 가지고, 처음에 $u$에 위치해있던 cow가 $k$분이 지난 후 $v$에 있을 때, 정점 $u$에서 $v$로 가는 간선들의 집합을 가지는 그래프를 만들자. 그래프의 모든 정점의 in-degree와 out-degree가 1이라는 특성을 이용하면, 해당 그래프는 독립된 cycle(loop 포함)들로만 이루어져있음을 알 수 있다.

$k$분까지, 각 cow별로 자리했던 unique한 위치를 set 배열등을 사용해 저장해놓고, 이후 각 cycle마다 set등을 이용하여 지나왔던 unique한 정점의 개수를 세주면 된다. set의 배열과 같은 다소 무거울 수 있는(?) 자료구조를 사용할 수 있는 이유는, set에 들어갈 수 있는 element의 수가 크게 많지 않음이 보장되기 때문이다. (swap으로 인해 발생할 수 있는 $2K$, 기존에 위치했던 자리인 $N$)

## No Time to Paint

[BOJ#20971](https://www.acmicpc.net/problem/20971)

$[1,x]$에 대한 stroke 최소 횟수를 $pre(x)$라고 하고, $[x,N]$에 대한 stroke 최소 횟수를 $post(x)$라고 하면, query로 주어진 구간 $[s,e]$에 대하여, $pre(s-1)+post(e+1)$를 해주면 답을 구해낼 수 있다.

$pre(), post()$는 monotonic stack을 활용하여 $O(N)$에 전처리 할 수 있다. monotonic stack에 대해 알고싶으면 아래 링크를 참조.

참고하면 좋은 글

- [Largest Rectangle in a Histogram 문제에서 monotonic stack을 활용하는 방법](https://www.acmicpc.net/blog/view/12)

## Spaced Out

[BOJ#20972](https://www.acmicpc.net/problem/20972)

직접 유효한 cow의 위치를 선정하다보면, 규칙을 발견할 수 있다.

- 어떤 행과 열에서도 이웃된 칸에 cow를 배치하지 않는다면, 해당 case에 대한 total beauty에 대한 계산은 자명하다. (체스판을 생각해보자)
- 어떤 행에서 이웃한 두 칸에 cow를 배치하면, 배치된 칸이 포함하는 열 전체의 배치는 자동으로 정해진다.
- 어떤 열의 배치가 확정되었으면, 이웃 열의 배치도 확정된다.

이해가 되지 않는다면, 아래 case에서 나머지 cow를 직접 배치해보자. 

```
?????
?????
?CC??
?????
?????
```

위와 같은 규칙을 이용하여 가로와 세로로 각각 total beauty를 구하고, 최댓값을 출력하면 된다.

## 총평

아마 처음으로 solution을 참고하지 않고 스스로 다 해결한 USACO 셋인것 같다. 이번 contest가 쉬워서 그런 것도 있겠지만, USACO문제들을 처음 풀기 시작한 때에 비하면 실력이 조금 늘긴 늘었나보다.