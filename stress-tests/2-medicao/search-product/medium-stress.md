execution: local
script: stress-tests/2-medicao/search-product/medium-stress.js
output: -

scenarios: (100.00%) 1 scenario, 1000 max VUs, 2m10s max duration (incl. graceful stop): \* default: 1000 looping VUs for 1m40s (gracefulStop: 30s)

data_received..................: 32 MB 301 kB/s
data_sent......................: 37 MB 350 kB/s
http_req_blocked...............: avg=364.26µs min=638ns med=2.94µs max=213.16ms p(90)=4.12µs p(95)=4.75µs
http_req_connecting............: avg=319.66µs min=0s med=0s max=211.94ms p(90)=0s p(95)=0s
http_req_duration..............: avg=62.38ms min=2.08ms med=23.98ms max=2.15s p(90)=134.73ms p(95)=251.46ms
{ expected_response:true }...: avg=62.38ms min=2.08ms med=23.98ms max=2.15s p(90)=134.73ms p(95)=251.46ms
http_req_failed................: 0.00% ✓ 0 ✗ 94634
http_req_receiving.............: avg=57.33µs min=7.7µs med=48.36µs max=664.03ms p(90)=70.78µs p(95)=80.84µs
http_req_sending...............: avg=157.25µs min=2.39µs med=11.04µs max=89.15ms p(90)=18.81µs p(95)=26.6µs
http_req_tls_handshaking.......: avg=0s min=0s med=0s max=0s p(90)=0s p(95)=0s
http_req_waiting...............: avg=62.17ms min=2.02ms med=23.91ms max=2.15s p(90)=134.66ms p(95)=251.34ms
http_reqs......................: 94634 897.374021/s
iteration_duration.............: avg=1.05s min=1s med=1.02s max=3.22s p(90)=1.13s p(95)=1.24s
iterations.....................: 94634 897.374021/s
vus............................: 67 min=67 max=1000
vus_max........................: 1000 min=1000 max=1000

running (1m45.5s), 0000/1000 VUs, 94634 complete and 0 interrupted iterations
