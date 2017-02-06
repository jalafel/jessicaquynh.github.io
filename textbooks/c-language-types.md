
### Language Types in C

* Integer 
  - `short`: 8 bits (-128 to +127)
  - `int`: 16 bits (+/- 32, 768)
  - `long`: 32 bits (+/2 2,147,483,648)
* Floating 
  - `float` 32 bits (+/- 3.4e^38 to 7 sig figs)
  - `double`: 64 bits (+/- 1.7e^308 to 15 sig figs)
* Boolean
  - `short`, `int`, `long`; `0` is false
* Character
  - `char`, `unsigned int`: 8 bits (0 to 256)
* String
  - `char*`: 32 bits (address in memory)
* Pointers
  - `TYPE*`: 32 bits (address in memory)

### Everything is an Integer? ASCII to Hex

```
  char c = 'A';
  // hits compiler and becomes
  unsigned short c = 97;

```

```
  char c = 'A';
  int d = 97;

  printf("%c", c); // A
  printf("%d", c); // 97
  printf("%c", d); // A
  printf("%c", c+1); // B

```

### C interprets Strings with a Stop-bit

The stop bit of a C-string is 0. The memory address will iterate through each 
place in the stack until the `integer` 0 (`unsigned int 0`) is reached (also 
known as `null`).

### Arrays

```
// Creates a pointer and the array with 10 spaces.
// The pointer is called 'x'
int x[10];
```

Each space __may__ be initialized to zero. It is impossible to determine without
knowing the specifications of your exact compiler.

### Initializing main program

```
int main (void)
{
  return value; // 0 or 1, 0 is good, 1 is bad :(
}
```

or

```
// int and char *[] are required. Name is just a convention.
int main (int argc, char *argv[])
{
  return value;
}
```

The only thing that precedes the main program is your shell. 

                         =========
                         | Shell |
                         =========
                             |
                             |
                             v
                        ==========
                        | main() |
                        ==========
