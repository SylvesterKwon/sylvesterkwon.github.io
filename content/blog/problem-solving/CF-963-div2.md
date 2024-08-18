---
title: Codeforces Round 963 (Div. 2)
date: 2024-08-13 00:00:00
tags: Codeforces
---

[Dashboard - Codeforces Round 963 (Div. 2) - Codeforces](https://codeforces.com/contest/1993)

## 문제 풀이

### A. [Question Marks](https://codeforces.com/contest/1993/problem/A)

00:03

입력으로 들어온 A, B, C, D 의 개수를 각각 세어준 다음 $max(n, |A|)+max(n,|B|)+max(n,|C|)+max(n,|D|)$ 를 하면 정답이다. 물음표 입력은 무시하면 된다.

### B. [Parity and Sum](https://codeforces.com/contest/1993/problem/B)

00:24

처음에 문제를 읽었을때 놓치기 쉬운 중요한 조건은 연산을 적용할 두 수의 홀짝성 (parity)이 달라야한다는 것이다. 그럼 다음 두가지 경우를 생각해볼 수 있다:

- 홀수에 짝수를 더하는 경우: 기존 홀수는 그대로 홀수가 된다.
- 짝수에 홀수를 더하는 경우: 기존 짝수는 홀수로 변경된다.

핵심 아이디어는 홀수는 짝수가 될 수 없지만 (짝수가 더해지면 홀짝성이 보전되기 때문에) 짝수는 홀수가 될 수 있다는 것이다. 그렇다면 모든 수가 홀짝성이 동일할때를 예외 처리하고 (이때는 당연하게도 답이 0이 된다), 존재하는 모든 짝수를 홀수로 변경하는 것만 가능하다는 것을 알 수 있다.

배열 $a$에 존재하는 가장 큰 홀수인 $a_{greatest\,odd}$ 를 가지고 배열 $a$에 있는 짝수를 작은 순서대로 홀수로 만든다. $a_{smallest\,even}:=a_{greatest\,odd}+a_{smallest\,even}$ 여기서 새로 만들어지는 홀수는 기존의 배열에서의 최대 홀수보다 더 커지기 때문에 매 연산마다 $a_{greatest\,odd}$ 는 증가한다. 여기서 $a_{greatest\,odd} < a_{smallest\,even}$ 인 케이스에서는 연산의 특성상 짝수인수 를 홀수인 수로 변경할 수 없는데, 이 경우에만 특별히 $a_{greatest\,odd}:=a_{greatest\,odd}+a_{greatest\,even}$ 을 한번 수행한다면 새 $a_{greatest\,odd}$는 배열에서 나머지 모든 짝수인 수보다 높기 때문에 짝수를 홀수로 변경하는데 문제 없다.

### C. [Light Switches](https://codeforces.com/contest/1993/problem/C)

01:11

모든 집에서 전구가 꺼지고 켜짐은 $2k$ 만큼의 주기안에서 반복되므로 $\mod 2k$ 에서 모든 전구가 켜질 수 있는 시간을 집합 $S$ 에 관리하자. 집합 $S$ 는 C++ set 등으로 표한하면 원소 추가/삭제가 $\mathcal{O}(log N)$에 가능하다. 집합 집합 $S$의 초기 원소를 $\{0, 1, ..., 2k-1\}$ 이라고 두고 집을 하나씩 추가해 가면서 불가능한 시간대는 집합에서 제거해 나가면 된다.

집 $i$ 마다 전구가 꺼지는 시간대 집합인 $\{x\mod 2k|x\in[a_i+k, a_i+2k)\}$ 를 초기 집합 $S$ 에서 제거해주면 된다. 초기에 $|S| = 2k$ 였으므로, 삭제 연산이 최대 $2k$ 번밖에 일어나지 않으므로 시간 초과를 받을 우려는 없다.

$\mod 2k$에 대해서만 전구가 다 켜질 수 있는지만 알고 있으므로 가장 마지막으로 집이 활성화되는 시간 이후에 전구가 다 켜질 수 있는 시간대를 출력하면 된다.

### D. [Med-imize](https://codeforces.com/contest/1993/problem/D)

upsolved

핵심 아이디어는 중앙값이 $m$이상 될 수 있는지를 이분탐색해서 lower bound를 찾으면 된다는 것이다. 이분탐색을 할때도 lower bound 를 탐색할 것이기 때문에 정확한 중앙값이 $m$인지 체크하지 않아도 된다는 점에 주목하자. 그럼 중앙값의 하한이 $m$으로 고정된 상태에서 중앙값이 $m$이상이 되도록 subarray 를 제거하는 연산을 할 수 있는지를 빠르게 찾는게 관건이다. DP 를 사용해서 이 부분 문제를 잘 풀어보자.

$dp(i,j)$ 를 배열의 왼쪽부터 subarray 를 $i$번 만큼 제거했고 그중 $j$ 번 만큼의 수는 중앙값 계산을 위해 남긴 경우에 남은 수중 $m$보다 같거나 큰 수의 개수의 최댓값을 저장하는 공간이라고 보자. 그럼 아래와 같은 점화식을 그릴 수 있다. (아래의 식은 배열 $a$ 가 0-index 이다)

$$
dp(i,j)=max(dp(i-1,j), dp(i,j-1)+x)\\
x = \begin{cases} 
1 & \text{if } m\leq a_{ki+j-1} \\
0 & \text{otherwise}
\end{cases}
$$

각 $dp$ 의 항을 계산하는 것은 $\mathcal{O}(1)$이고, $dp$  의 크기는 $i$가 $\mathcal{O}(n/k)$, $j$가 $\mathcal{O}(k)$이므로, $\mathcal{O}(n)$이다. 따라서 이분 탐색 안의 부분 문제는 $\mathcal{O}(n)$에 해결할 수 있고, 전체 문제는 $\mathcal{O}(n\log(a_{max})) (a_{max}\leq10^9)$ 에 해결할 수 있다.

사견: 이전에 버추얼했던 Codeforces Round 965 (Div. 2) C 번에서도 중앙값 문제가 출제되었는데, 이 문제에서도 이분탐색이 유효한 아이디어였다. 비슷한 아이디어를 바로 써먹어볼 수 있어서 좋은 경험이였다…

### E. [Xor-Grid Problem](https://codeforces.com/contest/1993/problem/E)

upsolved, 에디토리얼 참조함

사견: XOR 의 성질을 이용해서 가상의 행과 열을 기존의 행렬 끝에 추가하는게 핵심이다. 이후에는 TSP 문제로 축소되어 해결할 수 있는데… 문제는 가상의 행, 열을 추가하는 아이디어가 발상이 너무 어려웠고 에디토리얼 읽고 구현에도 조금 난항을 겪었다. XOR 문제라서 그런지 아주 신선한 느낌인데, 대체 XOR 의 세계는 얼마나 깊은 것인가…

소스코드: https://codeforces.com/contest/1993/submission/276098306

### F1. Dyn-scripted Robot (Easy Version)

upsolved, 에디토리얼 참조함

F2 풀이로 제출하였다. F1 풀이 참조

### F2. Dyn-scripted Robot (Hard Version)

upsolved, 에디토리얼 참조함

이 문제도 풀이를 참조하고 풀었기 때문에, 풀이 아이디어만 간단하게 적는다.

좌표평면 $W \times H$ 에서 이동을 하는데, 좌표평면 경계 밖으로 나가게 된다면 이후의 움직임이 넘고자하는 좌표평면 경계의 축 대칭으로 반전되게 된다. 움직임 규칙이 너무 복잡하니 가로 세로 크기가 두배인 좌표평면 $2W \times 2H$ 에서 축 대칭 반전 규칙 없이 움직인다고 보면 생각이 단순화 된다. (벽면에서 반사되는 트릭은 다음 문제도 비슷한 아이디어를 적용하여 풀이할 수 있다.  [Codeforces Round 484 (Div. 2) - E. Billard](https://codeforces.com/contest/982/problem/E))

그럼 크기가 두배인 새로운 좌표평면에서 원점에 도달했는지는 어떻게 알 수 있을까? 좌표 $(x,y)$ 에 대하여 $x \equiv 0 \pmod {2W}, y \equiv 0 \pmod {2H}$ 을 만족하면 원점에 도달했다고 볼 수 있다. 법 $2W$, $2H$ 안에서 [포탈](https://en.wikipedia.org/wiki/Portal_(video_game)) 게임과 같은 움직임이 계속 되는 것이라고 할 수 있다.

로봇의 움직임은 주기성을 지니는데, 한 주기에서 주어진 움직임 명령 $S_i$ 까지 움직였을때 이동한 방향 벡터를 $(X_i,Y_i)$ 라고 하자, 모든 방향 벡터 $(X_i, Y_i)$ 에서 시작해서 한 주기단위로 “점프”했을때 언제 처음으로 원점을 밟는지, 몇주기마다 원점을 다시 밟는지를 다음 연립합동식으로부터 도출해낼 수 있다.

$$
\begin{align}
X_n \cdot x \equiv X_i \pmod{2W} \\
Y_n \cdot x \equiv Y_i \pmod{2H}
\end{align}
$$

## 총평

A, B, C 번을 조금 빨리 구현하고 D 번 고민할 시간을 조금 더 벌었으면 충분히 시간 종료 이내에 D번을 풀 수 있었을 것 같은데 아쉽다. (타임스탬프 확인해보니 종료시간 +30분에 해결했다…😢) 버추얼 콘테스트를 조금 더 참여해서 쉬운 문제를 빨리 넘긴다면 레이팅 많이 딸 수 있겠다는 생각이 든다.