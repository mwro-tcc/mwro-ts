execution: local
script: stress-tests/3-medicao/search-product/low-stress.js
output: -

scenarios: (100.00%) 1 scenario, 10 max VUs, 3m30s max duration (incl. graceful stop): \* default: 10 looping VUs for 3m0s (gracefulStop: 30s)

data_received..............: 545 kB 2.8 kB/s
data_sent..................: 689 kB 3.6 kB/s
http_req_blocked...........: avg=3.82µs min=597ns med=2.29µs max=373.1µs p(90)=3.86µs p(95)=4.33µs
http_req_connecting........: avg=793ns min=0s med=0s max=203.45µs p(90)=0s p(95)=0s
http_req_duration..........: avg=1.11ms min=184.13µs med=983.35µs max=7.18ms p(90)=1.91ms p(95)=2.19ms
http_req_failed............: 100.00% ✓ 1800 ✗ 0
http_req_receiving.........: avg=40.81µs min=6.87µs med=36.57µs max=386.82µs p(90)=63.24µs p(95)=75.4µs
http_req_sending...........: avg=12.52µs min=2.95µs med=9.39µs max=207.43µs p(90)=19.83µs p(95)=27.92µs
http_req_tls_handshaking...: avg=0s min=0s med=0s max=0s p(90)=0s p(95)=0s
http_req_waiting...........: avg=1.05ms min=151.32µs med=931.55µs max=6.98ms p(90)=1.85ms p(95)=2.14ms
http_reqs..................: 1800 9.378645/s
iteration_duration.........: avg=1s min=1s med=1s max=1s p(90)=1s p(95)=1s
iterations.................: 1800 9.378645/s
vus........................: 10 min=10 max=10
vus_max....................: 10 min=10 max=10

running (3m11.9s), 00/10 VUs, 1800 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs 3m0s
