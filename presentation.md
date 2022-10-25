## Example reveal-remark presentation


Note:

Add speaker notes like this

///

## include code samples like this

```ts twoslash
// @errors: 2322
let a = 1;

a = a + '2';
```

////

## use twoslash queries for type callouts

```ts twoslash
const dishes = ["pasta", "pizza", "lasagne"];

const favourite = dishes[2];
//    ^?
```

///

## Include other languages

```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }

    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        &self.width >= &other.width && &self.height >= &other.height
    }
}
```
