LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := testfuck
LOCAL_SRC_FILES := testfuck.cpp

include $(BUILD_SHARED_LIBRARY)