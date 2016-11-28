# Similar Strings

Check to see if strings are similar using the following algorithm.

Both strings have the same length.

For each valid pair of indices,`(i,j)` , in the strings, `[a_i == a_j and b_i == b_j] or [a_i != a_j and b_i != b_j]`.

Given string `S` of size `n` and `q` queries where each query is in the form of a pair of integers `(l_i, r_i)` 
find the number of substrings `S(x,y)` where substring `S(l_i, r_i)` is similar to substring `S(x,y)` and print this number on a new line.

Example input:

```
8 4
giggabaj
1 1
1 2
1 3
2 4
```

Edit: This challenge deals with comparing matricies.
