     execution: local
        script: stress-tests/1-medicao/sign-up/medium-stress.js
        output: -

     scenarios: (100.00%) 1 scenario, 1000 max VUs, 3m30s max duration (incl. graceful stop):
              * default: 1000 looping VUs for 3m0s (gracefulStop: 30s)


     data_received..................: 109 MB 588 kB/s
     data_sent......................: 32 MB  173 kB/s
     http_req_blocked...............: avg=442.28µs min=655ns  med=3.41µs   max=231.67ms p(90)=4.61µs   p(95)=5.12µs
     http_req_connecting............: avg=429.44µs min=0s     med=0s       max=230.17ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=345.44ms min=5.66ms med=363.67ms max=1.72s    p(90)=555.59ms p(95)=623.68ms
       { expected_response:true }...: avg=345.44ms min=5.66ms med=363.67ms max=1.72s    p(90)=555.59ms p(95)=623.68ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 134972
     http_req_receiving.............: avg=58.94µs  min=11.3µs med=55.64µs  max=6.35ms   p(90)=80.95µs  p(95)=90.45µs
     http_req_sending...............: avg=36.84µs  min=3.19µs med=17.62µs  max=56.77ms  p(90)=34.92µs  p(95)=38.24µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=345.34ms min=5.57ms med=363.56ms max=1.72s    p(90)=555.5ms  p(95)=622.81ms
     http_reqs......................: 134972 725.765804/s
     iteration_duration.............: avg=1.33s    min=1s     med=1.36s    max=2.72s    p(90)=1.54s    p(95)=1.59s
     iterations.....................: 134972 725.765804/s
     vus............................: 390    min=390      max=1000
     vus_max........................: 1000   min=1000     max=1000
