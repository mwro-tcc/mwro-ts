execution: local
script: stress-tests/2-medicao/search-product/low-stress.js
output: -

scenarios: (100.00%) 1 scenario, 10 max VUs, 3m30s max duration (incl. graceful stop): \* default: 10 looping VUs for 3m0s (gracefulStop: 30s)

data_received..................: 607 kB 3.2 kB/s
data_sent......................: 697 kB 3.7 kB/s
http_req_blocked...............: avg=8.68µs min=783ns med=3.14µs max=1.07ms p(90)=4.34µs p(95)=4.84µs
http_req_connecting............: avg=1.06µs min=0s med=0s max=267.34µs p(90)=0s p(95)=0s
http_req_duration..............: avg=7.85ms min=4.16ms med=7.54ms max=32.97ms p(90)=9.68ms p(95)=10.78ms
{ expected_response:true }...: avg=7.85ms min=4.16ms med=7.54ms max=32.97ms p(90)=9.68ms p(95)=10.78ms
http_req_failed................: 0.00% ✓ 0 ✗ 1790
http_req_receiving.............: avg=58.84µs min=11.56µs med=55.38µs max=1.59ms p(90)=77.87µs p(95)=88.71µs
http_req_sending...............: avg=14.22µs min=2.16µs med=12.43µs max=146.37µs p(90)=20.98µs p(95)=27.47µs
http_req_tls_handshaking.......: avg=0s min=0s med=0s max=0s p(90)=0s p(95)=0s
http_req_waiting...............: avg=7.77ms min=4.06ms med=7.46ms max=32.9ms p(90)=9.61ms p(95)=10.71ms
http_reqs......................: 1790 9.558845/s
iteration_duration.............: avg=1s min=1s med=1s max=1.03s p(90)=1.01s p(95)=1.01s
iterations.....................: 1790 9.558845/s
vus............................: 10 min=10 max=10
vus_max........................: 10 min=10 max=10
