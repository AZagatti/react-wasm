use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add_two_ints(a: u32, b: u32) -> u32 {
  a + b
}

#[wasm_bindgen]
pub fn fib(n: usize) -> usize {
    fn fib_memo(n: usize, memo: &mut [usize; 2]) -> usize {
        let [a, b] = *memo;
        let c = a + b;
        if n == 0 {
            c
        } else {
            *memo = [b, c];
            fib_memo(n - 1, memo)
        }
    }

    if n < 2 {
        1
    } else {
        fib_memo(n - 2, &mut [1, 1])
    }
}

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  alert(&format!("Hello, {}!", name));
}
