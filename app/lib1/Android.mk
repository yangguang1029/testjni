LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := libtest11
LOCAL_SRC_FILES := libtest1.so

include $(PREBUILT_SHARED_LIBRARY)