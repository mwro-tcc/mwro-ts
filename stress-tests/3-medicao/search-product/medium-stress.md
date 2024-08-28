     data_received..................: 116 MB 600 kB/s
     data_sent......................: 64 MB  333 kB/s
     http_req_blocked...............: avg=1.79ms  min=555ns  med=2.26µs  max=1.22s   p(90)=4.03µs   p(95)=4.67µs
     http_req_connecting............: avg=1.78ms  min=0s     med=0s      max=1.13s   p(90)=0s       p(95)=0s
     http_req_duration..............: avg=97.34ms min=3.1ms  med=79.75ms max=4.05s   p(90)=135ms    p(95)=157.48ms
       { expected_response:true }...: avg=97.34ms min=3.1ms  med=79.75ms max=4.05s   p(90)=135ms    p(95)=157.48ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 164708
     http_req_receiving.............: avg=37.81µs min=6.38µs med=32.21µs max=33.38ms p(90)=63.56µs  p(95)=77.13µs
     http_req_sending...............: avg=26.7µs  min=2.09µs med=8.82µs  max=54.59ms p(90)=19.4µs   p(95)=30.19µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=97.28ms min=3.04ms med=79.7ms  max=4.05s   p(90)=134.96ms p(95)=157.27ms
     http_reqs......................: 164708 854.032198/s
     iteration_duration.............: avg=1.09s   min=1s     med=1.08s   max=6.18s   p(90)=1.13s    p(95)=1.15s
     iterations.....................: 164708 854.032198/s
     vus............................: 139    min=139      max=1000
     vus_max........................: 1000   min=1000     max=1000

running (3m12.9s), 0000/1000 VUs, 164708 complete and 0 interrupted iterations
default ✓ [======================================] 1000 VUs 3m0s
