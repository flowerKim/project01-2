package net.bitacademy.java72.domain;

import java.io.Serializable;
import java.sql.Date;

public class Checkin implements Serializable {
  private static final long serialVersionUID = 1L;

  protected String thisUrl;
  protected String firstTime;
  protected String inTime;
  protected String outTime;
  protected String todayInfo;
  protected int checkinTime;
  protected int checkoutTime;
  protected int    memberNo;
  protected int    attendNo;
  protected int    eduNo;
  protected int    studentNo;
  protected String etc;
  protected Date   createDate;
  protected String yyyyMMdd; 
  
  
  
  public String getTodayInfo() {
    return todayInfo;
  }
  public void setTodayInfo(String todayInfo) {
    this.todayInfo = todayInfo;
  }
  public String getYyyyMMdd() {
    return yyyyMMdd; // yyyy-[M]M-[d]d
  }
  public void setYyyyMMdd(String yyyyMMdd) {
    this.setCreateDate(Date.valueOf(yyyyMMdd));
  }
  public Date getCreateDate() {
    return createDate;
  }
  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
    this.yyyyMMdd = createDate.toString();
  }
  public String getThisUrl() {
    return thisUrl;
  }
  public void setThisUrl(String thisUrl) {
    this.thisUrl = thisUrl;
  }
  
  public int getCheckinTime() {
    return checkinTime;
  }
  public void setCheckinTime(int checkinTime) {
    this.checkinTime = checkinTime;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
  public int getAttendNo() {
    return attendNo;
  }
  public void setAttendNo(int attendNo) {
    this.attendNo = attendNo;
  }
  public int getEduNo() {
    return eduNo;
  }
  public void setEduNo(int eduNo) {
    this.eduNo = eduNo;
  }
  public int getStudentNo() {
    return studentNo;
  }
  public void setStudentNo(int studentNo) {
    this.studentNo = studentNo;
  }
  public String getInTime() {
    return inTime;
  }
  public void setInTime(String inTime) {
    this.inTime = inTime;
  }
  public String getOutTime() {
    return outTime;
  }
  public void setOutTime(String outTime) {
    this.outTime = outTime;
  }
  public String getEtc() {
    return etc;
  }
  public void setEtc(String etc) {
    this.etc = etc;
  }
  public String getFirstTime() {
    return firstTime;
  }
  public void setFirstTime(String firstTime) {
    this.firstTime = firstTime;
  }
  public int getCheckoutTime() {
    return checkoutTime;
  }
  public void setCheckoutTime(int checkoutTime) {
    this.checkoutTime = checkoutTime;
  }

  
  
}
