package net.bitacademy.java72.domain;

import java.io.Serializable;

/*
 * Sirialzable 인터페이스
 * -> 클래스의 데이터를 바이트 배열로 직렬화할 수 있음을 표시할 때 사용.
 * -> 메소드가 없다. 단지 JVM에게 직렬화를 허용한다고 표시하는 용도로 사용
 */

import java.sql.Date;

public class Notice implements Serializable {
  /**
   * 직렬화될 때 데이터의 버젼 정보도 함께 저장된다.
   * (한글 hwp 저장할 때 파일에 버전 정보도 함께 저장되는 것과 같은 원리)
   * 나중에 바이트 배열을 다시 객체로 복원할 때 버젼을 검사하는 데 사용한다.
   * 
   */
  private static final long serialVersionUID = 1L;
 
  // DB와 이름을 일치시키지 마라. DB는 DB고 자바는 자바다.
  protected int    nno;
  protected String title;
  protected String content;
  protected Date   createDate;
  protected int    viewCount;
  protected int    managerNo;
  protected int    trainerNo;
  protected String ma_name;
  protected String t_name;
  protected String yyyyMMdd; // for JSON
  // 서브 클래스에서 필드를 추가하고 확장할 수 있기 때문에 protected 접근 제어자를
  // 통해 접근할 수 있도록 하는 것이 관례다.
  
  
  public String getMa_name() {
    return ma_name;
  }

  public int getViewCount() {
    return viewCount;
  }

  public void setViewCount(int viewCount) {
    this.viewCount = viewCount;
  }

  public void setMa_name(String ma_name) {
    this.ma_name = ma_name;
  }

  public String getT_name() {
    return t_name;
  }

  public void setT_name(String t_name) {
    this.t_name = t_name;
  }

  public String getYyyyMMdd() {
    return yyyyMMdd; // yyyy-[M]M-[d]d
  }


  public int getManagerNo() {
    return managerNo;
  }


  public void setManagerNo(int managerNo) {
    this.managerNo = managerNo;
  }


  public int getTrainerNo() {
    return trainerNo;
  }


  public void setTrainerNo(int trainerNo) {
    this.trainerNo = trainerNo;
  }


  public void setYyyyMMdd(String yyyyMMdd) {
    this.setCreateDate(Date.valueOf(yyyyMMdd));
  }


  public int getNno() {
    return nno;
  }


  public void setNno(int nno) {
    this.nno = nno;
  }


  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public Date getCreateDate() {
    return createDate;
  }
  public void setCreateDate(Date createDate) {
    this.createDate = createDate;
    this.yyyyMMdd = createDate.toString();
  }
  
  
  
}
