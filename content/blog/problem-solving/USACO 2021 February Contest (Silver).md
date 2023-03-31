---
title: USACO 2021 February Contest (Silver)
mathjax: true
date: 2021-03-23 18:48:05
tags: USACO
---
## Comfortable Cows

[BOJ#21232](https://www.acmicpc.net/problem/21232)

각 iteration 마다 cow를 추가하게 되면, 추가한 cell과, 인접한 cell간의 상태에 변화가 일어난다. 크게 두가지 상황이 있다.

- cow를 추가한 cell에는 원래 인접한 cow가 3개였는데, 정작 해당 칸에는 cow가 점유하고 있지 않은 상태여서 나머지 cell에 cow가 점유하고 있지 않아도 됐지만, 이번 iteration에서 해당 cell에 cow를 추가하여서 나머지 cell도 cow를 추가해야하는 상황
- cow를 추가한 cell과 인접한 4개의 cell은, 이번 iteration에 cow가 추가되면서 인접한 cow의 수가 1늘어나 3이되어 나머지 cell에 cow를 추가해야하는 상황

매 iteration 마다 추가해야하는 cow를 계산하려고 하지말고 변화에 집중해서 문제를 관찰해보자.  잘 생각해보면, 추가해야되는 것으로 판단되었던 cell이 다시 추가하지 않아도 되는 cell로 돌아가는 경우는 없다. 다시 말하면, 한번 cow를 추가하기로 되어 있었다면, 모든 iteration이 끝날때 까지 그 상태가 유지가 된다. 따라서 매 iteration 마다 추가해야하는 cow를 계산하려고 하지말고 매 iteration마다 나타나는 상태 변화에 집중해서 문제를 관찰해보자. 어떤 cell에 cow를 추가해야하지만 추가되지 않은 cell도 그냥 그 cell은 점유되었다고 생각하면 편하다. 그리고 점유된(실제로 cow가 점유하고 있거나 점유되어야 하는 칸 모두) cell 갯수에서 실제로 cow가 점유하고 있는 cell의 갯수를 매 iteration마다 출력해주면 된다. 추가해야하는 cow는 각 iteration별로 dfs를 해주면 구할 수 있다.

## Year of the Cow

[BOJ#21233](https://www.acmicpc.net/problem/21233)

입력받은 시간들을 정렬하고, 그것을 각각 $t_0, t_1, \cdots, t_{N-1}$이라고 하자. ($t_0$이 가장 먼 과거이다.) 그리고 시간이 과거에서 현재로 흐른다는 이점을 최대한 활용하기 위해, 현재에서 $t_0$에 위치한 ancestor를 만나기 위한 과거로 portal을 한번 이용한다. ($ceil()$을 이용하면 편할 것이다.) 이제 해야할 것은, $t_i$와 $t_j$사이에 portal을 사용하면 어떤지를 평가하는 것이다. 정확히는  $t_i$에 위치한 ancestor를 만난 후, portal을 사용해서 $t_j$에 위치한 ancestor를 만나기 위한 시간의 최대값으로 이동하는 것이다. 마찬가지로 $ceil()$, $floor()$등을 계산하면 쉽게 계산을 할 수 있다. portal을 이용해서 절약할 수 있는 시간을 $timegap$에 모아서 정렬을 해준다. 가장 큰것부터 $min(timegap_{size},K-1)$개 뽑아서 처음 portal을 사용하여 돌아간 시간에서 빼주면 된다. 

## Just Green Enough

[BOJ#21234](https://www.acmicpc.net/problem/21234)

문제를 단순화시켜서, sub-grid의 최소 green-ness가 100인 경우에서 101인 경우를 빼는 것으로 이 문제의 정답인 최소 green-ness가 정확히 100인 경우의 가짓수를 세도록 하자. 그렇다면 해결해야할 문제는 최소 green-ness가 $m$일 때, sub-grid의 가짓수를 시간내에 해결해야 한다.

우선 Naive하게 생각해보자. sub-grid는 모두 $N^2(N+1)^2/4$가지 경우가 있다고 한다. 각 sub-grid 마다 문제에서 주어진 sufficiently green한 조건을 만족하는지 확인하는데 $O(1)$이 걸린다고 쳐도, 이 방법으로는 $O(N^4)$의 시간이 걸리기 때문에 TLE를 면치 못할 것이다.

축 하나를 정하고, 해당 축에서 sub-grid의 시작지점과 끝지점을 각각 $i$, $j$로 고정하겠다. 문제를 1차원으로 축소해서 생각해보면, $O(N)$에 해결할 수 있다. 이를 prefix sum을 사용하여 저장해두면, 해당 행의 $i$~$j$까지의 cell이 모두 green-ness가 $m$보다는 같거나 큰것인지 $O(1)$에 알 수 있다. $k$행에서 $i$~$j$번째 cell의 green-ness가 모두 $m$보다 큰지를 $g_{i,j}(k)$라고 나타내도록 하자. 그렇다면 모든 $0\leq k<N$을 만족하는 모든 $k$에 대해서 $g_{i,j}(k)$를 계산할 수 있다. $g_{i,j}(k)$가 참인 $k$에 대해서 아까와 비슷한 상황이 나오게 되는데, $i$, $j$를 한축의 끝과 끝 좌표로 가지는 모든 sub-grid의 개수를 $O(N)$에 계산할 수 있게 된다. 그렇다면 문제를 $O(N^3)$에 해결할 수 있다. 실제로는 $_NC_2*N$번의 iteration을 수행하므로 단순 $O(N^3)$보다는 2배정도 빠르다.

iteration 순서를 조금 변형시켜서 $O(N^2)$에 문제를 해결하는 흥미로운 방법도 있다고 한다. [http://usaco.org/current/data/sol_prob3_silver_feb21.html](http://usaco.org/current/data/sol_prob3_silver_feb21.html) 를 참조하자.
