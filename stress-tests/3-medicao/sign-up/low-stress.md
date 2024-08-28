execution: local
script: stress-tests/3-medicao/search-product/low-stress.js
output: -

scenarios: (100.00%) 1 scenario, 10 max VUs, 3m30s max duration (incl. graceful stop): \* default: 10 looping VUs for 3m0s (gracefulStop: 30s)

data_received..................: 1.2 MB 6.5 kB/s
data_sent......................: 694 kB 3.6 kB/s
http_req_blocked...............: avg=4.46µs min=711ns med=2.85µs max=366.3µs p(90)=4.34µs p(95)=4.99µs
http_req_connecting............: avg=988ns min=0s med=0s max=318.57µs p(90)=0s p(95)=0s
http_req_duration..............: avg=11.34ms min=4.53ms med=10.96ms max=32.02ms p(90)=14.63ms p(95)=15.78ms
{ expected_response:true }...: avg=11.34ms min=4.53ms med=10.96ms max=32.02ms p(90)=14.63ms p(95)=15.78ms
http_req_failed................: 0.00% ✓ 0 ✗ 1781
http_req_receiving.............: avg=60.23µs min=9.2µs med=51.85µs max=3.49ms p(90)=84.93µs p(95)=95.41µs
http_req_sending...............: avg=14.31µs min=2.53µs med=11.85µs max=200.13µs p(90)=24.77µs p(95)=32.71µs
http_req_tls_handshaking.......: avg=0s min=0s med=0s max=0s p(90)=0s p(95)=0s
http_req_waiting...............: avg=11.27ms min=4.4ms med=10.88ms max=31.96ms p(90)=14.57ms p(95)=15.7ms
http_reqs......................: 1781 9.244806/s
iteration_duration.............: avg=1.01s min=1s med=1.01s max=1.03s p(90)=1.01s p(95)=1.01s
iterations.....................: 1781 9.244806/s
vus............................: 10 min=10 max=10
vus_max........................: 10 min=10 max=10
