     execution: local
        script: stress-tests/1-medicao/sign-up/high-stress.js
        output: -

     scenarios: (100.00%) 1 scenario, 10000 max VUs, 3m30s max duration (incl. graceful stop):
              * default: 10000 looping VUs for 3m0s (gracefulStop: 30s)

     data_received..................: 131 MB 654 kB/s
     data_sent......................: 39 MB  192 kB/s
     http_req_blocked...............: avg=31.05ms min=688ns    med=3.03µs  max=1.28s    p(90)=4.68µs  p(95)=366.95ms
     http_req_connecting............: avg=30.84ms min=0s       med=0s      max=1.28s    p(90)=0s      p(95)=366.27ms
     http_req_duration..............: avg=11.01s  min=827.47ms med=10.46s  max=1m3s     p(90)=12.99s  p(95)=13.36s
       { expected_response:true }...: avg=11s     min=827.47ms med=10.46s  max=47.44s   p(90)=12.99s  p(95)=13.35s
     http_req_failed................: 0.03%  ✓ 53         ✗ 162138
     http_req_receiving.............: avg=54.34µs min=0s       med=46.32µs max=798.66ms p(90)=68µs    p(95)=76.91µs
     http_req_sending...............: avg=1.96ms  min=3.75µs   med=12.26µs max=264.44ms p(90)=30.98µs p(95)=813.47µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=11s     min=703.84ms med=10.46s  max=1m3s     p(90)=12.99s  p(95)=13.36s
     http_reqs......................: 162191 807.874758/s
     iteration_duration.............: avg=11.32s  min=2.13s    med=11.36s  max=1m1s     p(90)=11.94s  p(95)=12.21s
     iterations.....................: 162191 807.874758/s
     vus............................: 550    min=550      max=10000
     vus_max........................: 10000  min=10000    max=10000
