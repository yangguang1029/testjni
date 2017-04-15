#include <iostream>

using namespace std;

extern void test1();

void test2(){

	cout << "fuck in test2" << endl;
	test1();
}