use wasm_bindgen::prelude::*;use fn_memo::{FnMemo, unsync, recur_fn::recur_fn};

#[wasm_bindgen]
pub fn fib(n: usize) -> usize {
  let memo_fib = unsync::memoize(recur_fn(|fib, n: usize| {
    println!("Evaluating {}", n);
    if n <= 1 {
        n
    } else {
        fib(n - 1) + fib(n - 2)
    }
  }));
  return memo_fib.call(n);
}

#[wasm_bindgen]
pub fn add_two_ints(a: u32, b: u32) -> u32 {
  a + b
}

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  alert(&format!("Hello, {}!", name));
}
