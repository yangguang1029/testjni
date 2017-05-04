LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := libtest2

FUCKPATH := "F:/testjni/app"
FUCKPATH1 := "F:\\testjni\\app"

LOCAL_C_INCLUDES := $(LOCAL_PATH) \
                     $(FUCKPATH)/cpp1 \
                     $(FUCKPATH1)/cpp3
LOCAL_SRC_FILES := test2.cpp

LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog

LOCAL_SHARED_LIBRARIES := libtest1 sub11 libinclude1

include $(BUILD_SHARED_LIBRARY)



$(call import-add-path,$(LOCAL_PATH)/../)
$(call import-module,cpp1)
$(call import-module,cpp1/cpp11)
$(call import-module,include1)

