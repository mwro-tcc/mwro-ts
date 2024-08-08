     execution: local
        script: stress-tests/1-medicao/search-product/low-stress.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 3m30s max duration (incl. graceful stop):
              * default: 10 looping VUs for 3m0s (gracefulStop: 30s)


     data_received..................: 594 kB 3.3 kB/s
     data_sent......................: 698 kB 3.9 kB/s
     http_req_blocked...............: avg=10.26µs min=611ns  med=2.87µs  max=2.18ms   p(90)=3.95µs  p(95)=4.45µs
     http_req_connecting............: avg=4.38µs  min=0s     med=0s      max=1.33ms   p(90)=0s      p(95)=0s
     http_req_duration..............: avg=7.52ms  min=2.24ms med=7.11ms  max=37.74ms  p(90)=9.5ms   p(95)=11.02ms
       { expected_response:true }...: avg=7.52ms  min=2.24ms med=7.11ms  max=37.74ms  p(90)=9.5ms   p(95)=11.02ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 1790
     http_req_receiving.............: avg=54.51µs min=7.41µs med=52.35µs max=291.11µs p(90)=73.2µs  p(95)=83.35µs
     http_req_sending...............: avg=13.7µs  min=2.19µs med=11.64µs max=245.72µs p(90)=21.88µs p(95)=26.2µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=7.45ms  min=2.14ms med=7.04ms  max=37.69ms  p(90)=9.43ms  p(95)=10.95ms
     http_reqs......................: 1790   9.991911/s
     iteration_duration.............: avg=1s      min=1s     med=1s      max=1.05s    p(90)=1.01s   p(95)=1.01s
     iterations.....................: 1790   9.991911/s
     vus............................: 10     min=10     max=10
     vus_max........................: 10     min=10     max=10

running (2m59.1s), 00/10 VUs, 1790 complete and 0 interrupted iterations
