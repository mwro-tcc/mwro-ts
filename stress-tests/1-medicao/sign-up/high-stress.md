     execution: local
        script: stress-tests/1-medicao/sign-up/high-stress.js
        output: -

     scenarios: (100.00%) 1 scenario, 10000 max VUs, 3m30s max duration (incl. graceful stop):
              * default: 10000 looping VUs for 3m0s (gracefulStop: 30s)

     data_received..................: 107 MB 542 kB/s
     data_sent......................: 32 MB  162 kB/s
     http_req_blocked...............: avg=17.13ms  min=661ns    med=3.74µs  max=725.45ms p(90)=8.33µs  p(95)=165.83ms
     http_req_connecting............: avg=17.04ms  min=0s       med=0s      max=725.44ms p(90)=0s      p(95)=165.54ms
     http_req_duration..............: avg=13.32s   min=332.63ms med=14s     max=1m1s     p(90)=15.99s  p(95)=16.74s
       { expected_response:true }...: avg=12.69s   min=332.63ms med=13.94s  max=46.68s   p(90)=15.97s  p(95)=16.42s
     http_req_failed................: 1.48%  ✓ 1983       ✗ 131571
     http_req_receiving.............: avg=59.74µs  min=0s       med=56.4µs  max=8.29ms   p(90)=84.25µs p(95)=94.33µs
     http_req_sending...............: avg=531.46µs min=3.62µs   med=19.25µs max=66.64ms  p(90)=43.8µs  p(95)=2.21ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=13.32s   min=330.19ms med=14s     max=1m1s     p(90)=15.99s  p(95)=16.74s
     http_reqs......................: 133554 678.767488/s
     iteration_duration.............: avg=13.93s   min=1.72s    med=14.83s  max=1m1s     p(90)=16.35s  p(95)=16.87s
     iterations.....................: 133554 678.767488/s
     vus............................: 335    min=335      max=10000
     vus_max........................: 10000  min=10000    max=10000
