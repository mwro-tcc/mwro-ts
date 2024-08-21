     execution: local
        script: stress-tests/1-medicao/sign-up/low-stress.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 3m30s max duration (incl. graceful stop):
              * default: 10 looping VUs for 3m0s (gracefulStop: 30s)


     data_received..................: 1.5 MB 7.8 kB/s
     data_sent......................: 427 kB 2.3 kB/s
     http_req_blocked...............: avg=6.46µs  min=882ns  med=3.12µs  max=988.4µs  p(90)=4.55µs  p(95)=5.14µs
     http_req_connecting............: avg=740ns   min=0s     med=0s      max=262.99µs p(90)=0s      p(95)=0s
     http_req_duration..............: avg=5.12ms  min=2.09ms med=3.89ms  max=480.87ms p(90)=6.57ms  p(95)=7.97ms
       { expected_response:true }...: avg=5.12ms  min=2.09ms med=3.89ms  max=480.87ms p(90)=6.57ms  p(95)=7.97ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 1794
     http_req_receiving.............: avg=58.13µs min=7.43µs med=53.37µs max=271.92µs p(90)=78.87µs p(95)=91.76µs
     http_req_sending...............: avg=22.1µs  min=4.08µs med=14.49µs max=6.26ms   p(90)=30.99µs p(95)=36.05µs
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=5.04ms  min=2.03ms med=3.8ms   max=480.78ms p(90)=6.49ms  p(95)=7.88ms
     http_reqs......................: 1794   9.688225/s
     iteration_duration.............: avg=1s      min=1s     med=1s      max=1.08s    p(90)=1s      p(95)=1s
     iterations.....................: 1794   9.688225/s
     vus............................: 3      min=3      max=10
     vus_max........................: 10     min=10     max=10
