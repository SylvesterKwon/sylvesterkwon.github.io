---
title: Convex Hull 구현
mathjax: true
date: 2021-03-30 14:21:00
tags: PS
---

전처리

```cpp
typedef long long ll;
typedef complex<ll> P;
#define X real()
#define Y imag()
```

위껍질 아래껍질 분할 (x축 우선정렬)

```cpp
int n; cin>>n;
vector<P> pt;
for(int i=0;i<n;i++){
	ll x,y; cin>>x>>y;
	pt.push_back({x,y});
}
sort(pt.begin(),pt.end(),[](const P& a, const P& b){
	return a.X<b.X||(a.X==b.X&&a.Y<b.Y);
});
P p1=pt[0], p2=pt.back();
vector<P> up, down;
up.push_back(p1); down.push_back(p1);
for(int i=1;i<pt.size();i++){
	if(i==pt.size()-1||(conj(pt[i]-p1)*(p2-pt[i])).Y>0){
		while(up.size()>=2&&(conj(up[up.size()-1]-up[up.size()-2])*(pt[i]-up[up.size()-1])).Y<=0)
			up.pop_back();
		up.push_back(pt[i]);
	}
	if(i==pt.size()-1||(conj(pt[i]-p1)*(p2-pt[i])).Y<0){
		while(down.size()>=2&&(conj(down[down.size()-1]-down[down.size()-2])*(pt[i]-down[down.size()-1])).Y>=0)
			down.pop_back();
		down.push_back(pt[i]);
	}
}
vector<P> result;
for(int i=0;i<up.size();i++)
	result.push_back(up[i]);
for(int i=down.size()-2;i>0;i--)
	result.push_back(down[i]);
cout<<result.size()<<"\n";
```

## Rotating Calipers

Convex Hull을 구하고 $O(N)$만에 거리가 가장 먼 점을 찾는 기법

주의: Convex hull이 시계방향으로 정렬되어있어야 사용할 수 있음, 반시계방향으로 정렬 되어 있다면 4행의 while문의 cw함수 호출을 ccw로 고칠 것

```cpp
// distance function
ll dis(P a, P b){
	return (a.X-b.X)*(a.X-b.X)+(a.Y-b.Y)*(a.Y-b.Y);
}
```

```cpp
pair<P,P> ans; ll mxdis=0;
ll j=1; int chs=ch.size();
for(int i=0;i<chs;i++){
	while(cw(ch[i],ch[(i+1)%chs],ch[(i+1)%chs]+(ch[(j+1)%chs]-ch[j%chs]))){
		if(mxdis<dis(ch[i],ch[j%chs])){
			mxdis=dis(ch[i],ch[j%chs]);
			ans={ch[i],ch[j%chs]};
		}
		j++;
	}
	if(mxdis<dis(ch[i],ch[j%chs])){
		mxdis=dis(ch[i],ch[j%chs]);
		ans={ch[i],ch[j%chs]};
	}
}
```