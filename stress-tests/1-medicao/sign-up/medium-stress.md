     execution: local
        script: stress-tests/1-medicao/sign-up/medium-stress.js
        output: -

     scenarios: (100.00%) 1 scenario, 1000 max VUs, 3m30s max duration (incl. graceful stop):
              * default: 1000 looping VUs for 3m0s (gracefulStop: 30s)


     data_received..................: 135 MB 697 kB/s
     data_sent......................: 40 MB  205 kB/s
     http_req_blocked...............: avg=87.22µs min=612ns  med=2.77µs  max=282.86ms p(90)=3.74µs   p(95)=4.21µs
     http_req_connecting............: avg=52.58µs min=0s     med=0s      max=73.98ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=86.62ms min=1.83ms med=63.28ms max=2.57s    p(90)=168.2ms  p(95)=217.3ms
       { expected_response:true }...: avg=86.62ms min=1.83ms med=63.28ms max=2.57s    p(90)=168.2ms  p(95)=217.3ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 166662
     http_req_receiving.............: avg=55.54µs min=6.21µs med=44.84µs max=1.3s     p(90)=65.06µs  p(95)=73.59µs
     http_req_sending...............: avg=70.13µs min=2.96µs med=11.27µs max=285.61ms p(90)=26.24µs  p(95)=29.84µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=86.5ms  min=1.77ms med=63.2ms  max=2.57s    p(90)=167.96ms p(95)=217.02ms
     http_reqs......................: 166662 860.689993/s
     iteration_duration.............: avg=1.08s   min=1s     med=1.06s   max=3.57s    p(90)=1.16s    p(95)=1.21s
     iterations.....................: 166662 860.689993/s
     vus............................: 61     min=61       max=1000
     vus_max........................: 1000   min=1000     max=1000
