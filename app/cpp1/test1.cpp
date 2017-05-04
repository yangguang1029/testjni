#include <iostream>
#include "test1.h"
#include <android/log.h>

// #include "test11.h"
#include "cpp11/test11.h"

using namespace std;

void test1(){


	__android_log_print(ANDROID_LOG_INFO, "fuck", "fuck in test1 ");
}

Test1::Test1(){

    fuck11* fuck = new fuck11();

    __android_log_print(ANDROID_LOG_INFO, "fuck", "fuck in test1 constructor");
}