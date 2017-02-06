#include <stdio.h>

double timesTwo(double number)
{
    return 2 * number;
}

int main()
{
    printf("Running main.c\n");
    double ans = timesTwo(3.0);
    printf("The answer from our C++ timesTwo function, when given 3.0, is %f\n", ans);

    return 0;
}