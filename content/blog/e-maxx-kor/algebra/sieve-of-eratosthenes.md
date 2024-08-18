---
title: 에라토스테네스의 체
mathjax: true
date: 2022-01-07 17:00:00
tags: e-maxx-kor, algebra
---

# 에라토스테네스의 체

에라토스테네스의 체는 구간 $[1;n]$ 에 있는 모든 소수들을 $O(n \log \log n)$ 번의 연산만으로 찾아내는 알고리즘이다.

알고리즘은 매우 간단하다:
처음에는 2 와 $n$ 사이의 모든 수를 적는다. 그 다음 2의 적절한 배수인 모든 수를 합성수라고 표기한다 (2가 가장 작은 소수이기 때문이다). 여기서 $x$ 의 적절한 배수란, $x$ 보다 크면서 $x$ 로 나눌 수 있는 수를 말한다. 그 다음은, 합성수로 표기되지 않은 다음 수를 구하는데, 다음의 수는 3이 될 것이다. 이것은 3이 소수임을 의미한다. 그리고 마찬가지로 3의 모든 적절한 배수를 합성수라고 표기한다. 그 다음의 표기되지 않은 수, 즉 다음 소수는 5이다. 그리고 5의 적절한 배수를 합성수라고 표기한다. 주어진 모든 수에 대해 위 과정을 반복한다. 

다음 그림은 위 알고리즘을 사용하여 구간 $[1; 16]$ 의 모든 소수를 구하는 과정을 시각화한 것이다. 보여지는 것 처럼, 어떤 수를 합성수로 표기하는 일은 꽤 자주 일어난다.

![에라토스테네스의 체](https://cp-algorithms.com/img/sieve_eratosthenes.png)

이 알고리즘의 아이디어는 다음과 같다: 
만약 어떤 수보다 작은 소수가 해당 수를 나누지 못한다면, 그 수는 소수이다. 이 알고리즘에서는 각 소수들에 대하여 순차적으로 반복하기 때문에, 하나의 소수로라도 나누어지는 수들에 대해서는 이미 모두 합성수라고 표기했다. 따라서 어떤 수가 해당 이터레이션에도 여전히 표기되어있지 않다면, 그 수보다 작은 어떠한 소수로도 나눌 수 없었다는 의미이고 따라서 이는 해당 수가 소수임을 의미한다.

## 구현

```cpp
int n;
vector<bool> is_prime(n+1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i <= n; i++) {
    if (is_prime[i] && (long long)i * i <= n) {
        for (int j = i * i; j <= n; j += i)
            is_prime[j] = false;
    }
}
```

이 코드는 우선 $0$과 $1$을 제외한 모든 수들에 대해 "잠재적인 소수"라고 표기하고 합성수들을 선별하는 과정을 시작하게 된다. 이를 위해 이 알고리즘은 $2$ 에서 $n$ 까지의 모든 수들에 대해 반복한다. 만약 현재 수 $i$가 소수라면, 이 단계에서 $i^2$부터 시작해서 $i$ 의 배수인 모든 수들을 합성수라고 표기한다. 이 구현은 이미 한가지 최적화를 포함하고 있는데, 소수 $i$에 대해 $i^2$ 보다 작은 합성수들은 이미 $i$ 보다 작은 소인수를 가지기 때문에 거르지 않아도 된다. 다만 $i^2$ 가 `int` 형의 범위를 초과할 수 있기 때문에, 중첩된 루프문전에 `long long` 형을 사용하여 이를 방지해야한다.

이러한 구현을 사용하면 알고리즘은 $O(n)$ 의 메모리와 (이는 자명하다) $O(n \log \log n)$ 의 수행시간을 가질 것이다 (이는 자명하지 않기에, 다음 챕터에서 다룬다).

## 점근적 분석

이 알고리즘의 수행시간이 $O(n \log \log n)$ 라는 것을 증명해보자. 이 알고리즘은 각 소수 $p \le n$ 에 대해서 내부 루프에서 $\frac{n}{p}$ 번의 연산을 수행할 것이다. 따라서 다음 식을 평가해야 한다:

$$
\sum_{\substack{p \le n, \\\ p \text{ prime}}} \frac n p = n \cdot \sum_{\substack{p \le n, \\\ p \text{ prime}}} \frac 1 p.
$$

두가지 사실을 상기해보자.

  - $n$ 보다 작거나 같은 소수들의 개수는 근사적으로 $\frac n {\ln n}$ 이다.
  - $k$번째 소수는 근사적으로 $k \ln k$ 이다 (이것은 앞의 사실로 부터 바로 유도할 수 있다).

그래서 우리는 위의 식을 다음과 같이 나타낼 수 있다:

$$
\sum_{\substack{p \le n, \\\ p \text{ prime}}} \frac 1 p \approx \frac 1 2 + \sum_{k = 2}^{\frac n {\ln n}} \frac 1 {k \ln k}.
$$

첫번째 소수인 2를 합에서 제외했는데, 왜냐하면 $k = 1$ 인 경우, $k \ln k$ 는 $0$ 이고 이는 0으로 나누는 상황을 초래하기 때문이다.

이제 같은 함수를 $k$ 에 대해서 $2$ 부터 $\frac n {\ln n}$ 까지 적분하여 합을 평가하자 (이 합은 직사각형 방법을 통해 적분으로 근사될 수 있다):

$$
\sum_{k = 2}^{\frac n {\ln n}} \frac 1 {k \ln k} \approx \int_2^{\frac n {\ln n}} \frac 1 {k \ln k} dk.
$$

피적분함수의 원시함수는 $\ln \ln k$ 이다. 치환과 낮은 차수의 항을 제거하여 다음과 같은 결과를 얻는다:

$$
\int_2^{\frac n {\ln n}} \frac 1 {k \ln k} dk = \ln \ln \frac n {\ln n} - \ln \ln 2 = \ln(\ln n - \ln \ln n) - \ln \ln 2 \approx \ln \ln n.
$$

이제, 원래 식으로 돌아오면 다음과 같은 근사 식을 얻을 수 있다:

$$
\sum_{\substack{p \le n, \\\ p\ is\ prime}} \frac n p \approx n \ln \ln n + o(n).
$$

더욱 자세한 증명은 (연산횟수의 상수항에 대해서도 더욱 자세한 평가가 필요하다면) Hardy & Wright 의 책 "An Introduction to the Theory of Numbers" (p. 349) 에서 확인할 수 있다.

## 에라토스테네스의 체의 여러 최적화 기법

이 알고리즘의 가장 큰 단점은, 메모리를 여러번 훑으면서, 오직 단일 요소만 조작한다는 것이다. 그리고 이는 캐시-친화적이지 못하다. 따라서, $O(n \log \log n)$ 에 감추어져있는 상수항은 비교적으로 크다고 할 수 있다..

게다가, 이 알고리즘에 소비되는 메모리는 큰 $n$ 에 대해 병목을 초래할 것이다.

아래에 소개되는 방법들은 수행되는 연산들의 횟수와 메모리를 체감되게 줄여줄 것이다.

### 제곱근까지만 거르기

명백하게도, $n$ 까지의 모든 소수를 구하기 위해서는, $n$의 제곱근 이하인 소수들에 대해서만 거르기를 수행해도 충분할 것이다.

```cpp
int n;
vector<bool> is_prime(n+1, true);
is_prime[0] = is_prime[1] = false;
for (int i = 2; i * i <= n; i++) {
    if (is_prime[i]) {
        for (int j = i * i; j <= n; j += i)
            is_prime[j] = false;
    }
}
```

이러한 최적화는 복잡도에 영향을 주지 않는다 (실제로 위의 증명을 다시 사용해보면, $n \ln \ln \sqrt n + o(n)$ 회의 연산이 필요함을 알 수 있는데, 이는 로그의 성질에 의해 점근적으로 동일하다), 그러나 필요한 연산의 횟수는 체감될만큼 줄어들 것이다.

### 홀수만 거르기

$2$를 제외한 모든 짝수가 합성수이기 때문에, 짝수는 확인하지 않아도 된다. 따라서 홀수에 대해서만 수행해도 된다.

이 방법을 사용하면 알고리즘의 필요 메모리와 수행시간을 대략 절반정도 줄일 수 있다.

### 메모리 소비와 연산의 속도

우리는 에라토스테네스 체의 두 구현이 `vector<bool>` 자료구조를 사용하여 $n$ 비트의 메모리를 사용한다는 것에 주목해야한다. `vector<bool>` 는 일련의 `bool` 을 저장하는 정규 컨테이너가 아니다 (대부분의 컴퓨터 아키텍쳐에서는 `bool`은 1 바이트의 메모리를 차지한다). 이것은 `vector<T>` 에서 메모리 최적화를 위해 특수화된 것인데, 이것은 오직 $\frac{N}{8}$ 바이트의 메모리만 소비한다.

현대의 프로세서들의 구조는 특정 비트에 직접 접근할 수 없기 때문에, 비트보다는 바이트 단위로 작업하는 것에 훨씬 효율적이다. 그래서 사실 `vector<bool>` 는 비트를 연속적인 큰 메모리에 저장하고, 바이트 단위로 메모리에 접근하여 비트 마스킹이나 비트 쉬프트 같은 연산을 사용하여 특정 비트를 추출하거나 조작한다.

그것 때문에 `vector<bool>` 에서 비트를 읽거나 쓰는 것에는 오버헤드가 크기 때문에 `vector<char>` (각 원소마다 1 바이트의 메모리를 사용하기 때문에 사용하는 메모리는 8배 크다) 를 사용하는 경우가 빠른 경우가 많다.

하지만 에라토스테네스의 단순한 구현에 대해서는 `vector<bool>` 가 더 빠른것으로 밝혀졌다. 이 문제에서는 데이터를 캐시에 얼마나 빠르게 로드하느냐가 중요하기 때문에, 메모리를 적게 쓰는 것이 큰 이점을 가져다 준다.
이 ([벤치마크](https://gist.github.com/jakobkogler/e6359ea9ced24fe304f1a8af3c9bee0e)) 에서 보여주듯, `vector<bool>` 를 사용하는 것이 `vector<char>`를 사용하는 것 보다 1.4배에서 1.7배 정도 빠르다고 한다.

`bitset` 도 위와 같은 고려를 해볼 수 있다. 이것은 `vector<bool>` 와 마찬가지로 비트들을 저장하는데 효율적인 방법인데, 그래서 이것도 오직 $\frac{N}{8}$ 바이트의 메모리만을 차지한다, 하지만 원소에 접근하는 것은 조금 더 느릴 수 있다. 위의 벤치마크 에서 `bitset` 은 `vector<bool>` 보다 성능면에서 뒤떨어지는 것으로 나온다. 그리고 `bitset` 의 또 다른 단점은 컴파일 타임에 그것의 크기를 지정해줘야 한다는 것이다.

### 구간 체 (Segmented sieve)

이것은 항상 `is_prime[1...n]` 전체를 저장할 필요가 없기 때문에 "제곱근까지만 거르기" 최적화 기법에서 비롯된다.
체를 사용하기 위해서는 $n$ 의 제곱근 이하의 소수들 (`prime[1... sqrt(n)]`)에 대해서만 저장하고, 구간을 나누고, 각 구간마다 체를 적용할 것이다.

$s$ 가 구간의 사이즈를 정하는 상수라고 하자, 그러면 전체 $\lceil {\frac n s} \rceil$ 개의 구간이 생긴다. 구간 $k$ ($k = 0 ... \lfloor {\frac n s} \rfloor$) 는 구간 $[ks; ks + s - 1]$ 에 있는 수들을 가진다. 우리는 이 구간에 대해 차례대로 작업할 수 있는데, 다시 말해 모든 구간 $k$ 마다 $1$ 에서 $\sqrt n$ 까지 모든 소수를 살펴보면서 체로 거르기를 수행할 것이다. 첫번째 수들을 다룰 때의 경우에 전략을 약간 수정해야 함을 주목할 필요가 있는데, 우선, 구간 $[1; \sqrt n]$ 에 속해있는 모든 소수들은 스스로를 제거하면 안된다, 그리고 $0$ 과 $1$ 는 소수가 아닌 수로 표기되어야 한다. 마지막 구간을 작업할 때 마지막으로 요구되는 수 $n$ 은 구간의 끝에 있을 필요가 없다는 사실을 잊으면 안된다.

앞서 다루었듯, 에라토스테네스의 체의 전형적인 구현은 CPU 캐시에 얼마나 빠르게 데이터를 로드할 수 있느냐가 속도를 좌우한다. "잠재적인 소수" 구간 $[1; n]$ 을 더 작은 구간으로 나눔으로써, 여러개의 구간을 동시에 메모리에 저장할 필요가 없어졌고, 모든 연산이 더욱 캐시-친화적이게 되었다.
따라서 더이상 캐시의 속도는 중요하지 않으므로, `vector<bool>` 를 `vector<char>` 로 대체할 수 있고, 프로세서가 바이트단위로 읽기 쓰기를 수행하고 더 이상 개별 비트를 추출하기 위하여 비트 연산자에 의존하지 않아도 되기 때문에 성능향상을 기대할 수 있다.
[벤치마크](https://gist.github.com/jakobkogler/e6359ea9ced24fe304f1a8af3c9bee0e) 가 보여주듯, `vector<char>` 를 사용하는 것은 이 상황에서 `vector<bool>` 를 사용하는 것 보다 3배 정도 빠르다. 다만 이는 아키텍쳐, 컴파일러나 최적화 수준에 따라 이는 변할 수 있기 때문에 해석에 주의가 필요하다.

다음은 구간 체를 사용하여 $n$ 보다 같거나 작은 모든 소수들의 개수를 구하는 구현체이다.

```cpp
int count_primes(int n) {
    const int S = 10000;

    vector<int> primes;
    int nsqrt = sqrt(n);
    vector<char> is_prime(nsqrt + 2, true);
    for (int i = 2; i <= nsqrt; i++) {
        if (is_prime[i]) {
            primes.push_back(i);
            for (int j = i * i; j <= nsqrt; j += i)
                is_prime[j] = false;
        }
    }

    int result = 0;
    vector<char> block(S);
    for (int k = 0; k * S <= n; k++) {
        fill(block.begin(), block.end(), true);
        int start = k * S;
        for (int p : primes) {
            int start_idx = (start + p - 1) / p;
            int j = max(start_idx, p) * p - start;
            for (; j < S; j += p)
                block[j] = false;
        }
        if (k == 0)
            block[0] = block[1] = false;
        for (int i = 0; i < S && start + i <= n; i++) {
            if (block[i])
                result++;
        }
    }
    return result;
}
```

구간 체의 수행 시간은 나누는 구간의 사이즈가 너무 작지만 않다면 일반적인 에라토스테네스의 체의 수행시간과 같다. 하지만 메모리는 $O(\sqrt{n} + S)$ 로 줄어들 것이며 이것은 캐싱에 있어 더 유리한 결과를 가져온다. 반면에, 나눠진 각 구간과 $[1; \sqrt{n}]$ 범위의 소수들간 나눗셈 연산이 있기 때문에, 구간의 크기가 작을수록 좋지 않을 것이다. 따라서, 상수 $S$ 를 선택할때는 균형을 유지하는 것이 중요하다. 실험 결과, 일반적으로 구간의 크기를 $10^4$ 와 $10^5$ 사이로 잡았을 때 가장 좋은 성능을 얻을 수 있음이 확인되었다.

## 특정 범위에서 소수들 찾기

때때로 $R$이 매우 크지만 (예를 들어 $1e12$), 범위가 작은 구간 $[L,R]$ (예를 들어 $R - L + 1 \approx 1e7$)에 대하여 범위의 모든 소수를 구할 필요가 있을 수 있다.

이러한 문제를 해결하기 위하여, 구간 체의 아이디어를 사용할 수 있다.
$\sqrt R$ 까지의 모든 소수를 미리 생성해두고, 이 소수들을 구간 $[L, R]$ 에 있는 모든 합성수들을 표시하는데 사용하면 된다.

```cpp
vector<char> segmentedSieve(long long L, long long R) {
    // generate all primes up to sqrt(R)
    long long lim = sqrt(R);
    vector<char> mark(lim + 1, false);
    vector<long long> primes;
    for (long long i = 2; i <= lim; ++i) {
        if (!mark[i]) {
            primes.emplace_back(i);
            for (long long j = i * i; j <= lim; j += i)
                mark[j] = true;
        }
    }

    vector<char> isPrime(R - L + 1, true);
    for (long long i : primes)
        for (long long j = max(i * i, (L + i - 1) / i * i); j <= R; j += i)
            isPrime[j - L] = false;
    if (L == 1)
        isPrime[0] = false;
    return isPrime;
}
```
이 접근의 시간 복잡도는 $O((R - L + 1) \log \log (R) + \sqrt R \log \log \sqrt R)$ 이다.

그리고 모든 소수들을 미리 생성하지 않는 것도 가능하다:

```cpp
vector<char> segmentedSieveNoPreGen(long long L, long long R) {
    vector<char> isPrime(R - L + 1, true);
    long long lim = sqrt(R);
    for (long long i = 2; i <= lim; ++i)
        for (long long j = max(i * i, (L + i - 1) / i * i); j <= R; j += i)
            isPrime[j - L] = false;
    if (L == 1)
        isPrime[0] = false;
    return isPrime;
}
```

자명하게도 시간 복잡도는 더 올라간다 ($O((R - L + 1) \log (R) + \sqrt R)$). 그러나 실제로는 아주 빠르게 수행된다.

## 선형 수행시간을 가지는 변형 알고리즘

이 알고리즘을 선형 시간 복잡도를 가지게 변형할 수 있다. 이 접근은 [Linear Sieve](./prime-sieve-linear.html) 아티클에 소개되어 있다. 그러나 해당 알고리즘 또한 자체적인 단점을 지니고 있다.

## 연습문제

* [SPOJ - Printing Some Primes](http://www.spoj.com/problems/TDPRIMES/)
* [SPOJ - A Conjecture of Paul Erdos](http://www.spoj.com/problems/HS08PAUL/)
* [SPOJ - Primal Fear](http://www.spoj.com/problems/VECTAR8/)
* [SPOJ - Primes Triangle (I)](http://www.spoj.com/problems/PTRI/)
* [Codeforces - Almost Prime](http://codeforces.com/contest/26/problem/A)
* [Codeforces - Sherlock And His Girlfriend](http://codeforces.com/contest/776/problem/B)
* [SPOJ - Namit in Trouble](http://www.spoj.com/problems/NGIRL/)
* [SPOJ - Bazinga!](http://www.spoj.com/problems/DCEPC505/)
* [Project Euler - Prime pair connection](https://www.hackerrank.com/contests/projecteuler/challenges/euler134)
* [SPOJ - N-Factorful](http://www.spoj.com/problems/NFACTOR/)
* [SPOJ - Binary Sequence of Prime Numbers](http://www.spoj.com/problems/BSPRIME/)
* [UVA 11353 - A Different Kind of Sorting](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2338)
* [SPOJ - Prime Generator](http://www.spoj.com/problems/PRIME1/)
* [SPOJ - Printing some primes (hard)](http://www.spoj.com/problems/PRIMES2/)
* [Codeforces - Nodbach Problem](https://codeforces.com/problemset/problem/17/A)
* [Codefoces - Colliders](https://codeforces.com/problemset/problem/154/B)
