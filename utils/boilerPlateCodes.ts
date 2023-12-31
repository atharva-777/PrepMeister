const codes = {
  cpp: {
    name: "cpp",
    code: `#include <bits/stdc++.h>
    using namespace std;
        int main() {
          int t;
          cin>>t;
          while(t--){

          }
        return 0;
    }`,
  },
  c: {
    name: "c",
    code: `#include <stdio.h>
    using namespace std;
    int main() {
      int t;
      scanf("%d",t);
      while(t--){

      }
        return 0;
    }`,
  },
  javascript: {
    name: "javascript",
    code: `
    'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function main(){
  let t = parseInt(readLine());

  for(let i=0;i<t;i++){
    
  }

}

`,
  },
  go: {
    name: "go",
    code: `package main
    import "fmt"
    func main() {
        fmt.Println("Hello World!")
    }`,
  },
  swift: {
    name: "swift",
    code: `print("Hello, World!")`,
  },
  r: {
    name: "r",
    code: `message <-"Hello World!"
    print(message)`,
  },
  java: {
    name: "java",
    code: `class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }`,
  },
  python: {
    name: "python",
    code: `print("Hello world")`,
  },
  rust: {
    name: "rust",
    code: `fn main() {
        println!("Hello, World!");
    }`,
  },
  csharp: {
    name: "csharp",
    code: `using System;
        public class HelloWorld
        {
        public static void Main(string[] args)
        {
            Console.WriteLine ("Hello Mono World");
        }
    }`,
  },
  other: {
    name: "other",
    code: `//Write code from scratch`,
  },
};

export default codes;
