     execution: local
        script: stress-tests/1-medicao/sign-up/low-stress.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 3m30s max duration (incl. graceful stop):
              * default: 10 looping VUs for 3m0s (gracefulStop: 30s)


     data_received..................: 1.5 MB 7.5 kB/s
     data_sent......................: 428 kB 2.2 kB/s
     http_req_blocked...............: avg=4.06µs  min=923ns   med=2.79µs  max=329.16µs p(90)=4µs     p(95)=4.49µs
     http_req_connecting............: avg=663ns   min=0s      med=0s      max=200.84µs p(90)=0s      p(95)=0s
     http_req_duration..............: avg=6.25ms  min=1.89ms  med=3.89ms  max=810.8ms  p(90)=6.81ms  p(95)=7.93ms
       { expected_response:true }...: avg=6.25ms  min=1.89ms  med=3.89ms  max=810.8ms  p(90)=6.81ms  p(95)=7.93ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 1800
     http_req_receiving.............: avg=50.91µs min=10.33µs med=46.86µs max=288.6µs  p(90)=68.2µs  p(95)=79.36µs
     http_req_sending...............: avg=19.05µs min=3.85µs  med=12.38µs max=5.81ms   p(90)=27.05µs p(95)=31.51µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=6.18ms  min=1.85ms  med=3.83ms  max=810.75ms p(90)=6.73ms  p(95)=7.84ms
     http_reqs......................: 1800   9.305368/s
     iteration_duration.............: avg=1s      min=1s      med=1s      max=1.02s    p(90)=1s      p(95)=1s
     iterations.....................: 1800   9.305368/s
     vus............................: 10     min=10     max=10
     vus_max........................: 10     min=10     max=10
