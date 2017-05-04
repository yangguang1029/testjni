#include <iostream>
#include "com_example_guangyang_testjni1_TestJNI.h"
#include <android/log.h>

#include "test1.h"

using namespace std;

 extern void test1();

 extern void test11();

 extern void include1();

void Java_com_example_guangyang_testjni1_TestJNI_test
  (JNIEnv *env, jobject jo){
  	 __android_log_print(ANDROID_LOG_INFO, "fuck", "fuck in test2");
	 Test1* t = new Test1();
	test1();

    test11();
	 include1();
  }

