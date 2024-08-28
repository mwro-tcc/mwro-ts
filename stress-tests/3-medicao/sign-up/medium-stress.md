     execution: local
        script: stress-tests/3-medicao/sign-up/medium-stress.js
        output: -

     scenarios: (100.00%) 1 scenario, 1000 max VUs, 3m30s max duration (incl. graceful stop):
              * default: 1000 looping VUs for 3m0s (gracefulStop: 30s)


     data_received..................: 139 MB 725 kB/s
     data_sent......................: 40 MB  208 kB/s
     http_req_blocked...............: avg=456.19µs min=622ns  med=2.72µs  max=256.62ms p(90)=3.82µs   p(95)=4.33µs
     http_req_connecting............: avg=446.89µs min=0s     med=0s      max=256.6ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=77.24ms  min=2.15ms med=51.24ms max=4.2s     p(90)=125.24ms p(95)=152.22ms
       { expected_response:true }...: avg=77.24ms  min=2.15ms med=51.24ms max=4.2s     p(90)=125.24ms p(95)=152.22ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 168029
     http_req_receiving.............: avg=51.59µs  min=7.97µs med=37.84µs max=1.05s    p(90)=59µs     p(95)=68.92µs
     http_req_sending...............: avg=39.85µs  min=2.89µs med=11.25µs max=25.37ms  p(90)=25µs     p(95)=29.61µs
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=77.15ms  min=2.08ms med=51.19ms max=4.2s     p(90)=125.16ms p(95)=152.16ms
     http_reqs......................: 168029 875.570819/s
     iteration_duration.............: avg=1.07s    min=1s     med=1.05s   max=5.2s     p(90)=1.12s    p(95)=1.14s
     iterations.....................: 168029 875.570819/s
     vus............................: 101    min=101      max=1000
     vus_max........................: 1000   min=1000     max=1000
