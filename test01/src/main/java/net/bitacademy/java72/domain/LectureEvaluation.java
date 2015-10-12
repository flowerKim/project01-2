package net.bitacademy.java72.domain;

import java.io.Serializable;

/*
 * Sirialzable 인터페이스
 * -> 클래스의 데이터를 바이트 배열로 직렬화할 수 있음을 표시할 때 사용.
 * -> 메소드가 없다. 단지 JVM에게 직렬화를 허용한다고 표시하는 용도로 사용
 */

import java.sql.Date;

public class LectureEvaluation implements Serializable {
	/**
	 * 직렬화될 때 데이터의 버젼 정보도 함께 저장된다.
	 * (한글 hwp 저장할 때 파일에 버전 정보도 함께 저장되는 것과 같은 원리)
	 * 나중에 바이트 배열을 다시 객체로 복원할 때 버젼을 검사하는 데 사용한다.
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// DB와 이름을 일치시키지 마라. DB는 DB고 자바는 자바다.
	protected int    eno;
	protected int    sno;
	protected String cur_name;
	protected String op;
	protected String sub;
	protected int    sub_eval1;
	protected int    sub_eval2;
	protected int    sub_eval3;
	protected int    tch_eval1;
	protected int    tch_eval2;
	protected int    tch_eval3;
	protected int    tch_eval4;
	protected int    cur_eval1;
	protected int    cur_eval2;
	protected int    cur_eval3;
	protected int    cur_eval4;
	protected int    dev1;
	protected int    dev2;
	protected int    mng_eval1;
	protected int    mng_eval2;
	protected Date edate;
	protected Date edu_Date;
	protected Date edu_Date2;
	protected String yyyyMMdd1;
	protected String yyyyMMdd2;
	// for JSON
	// 서브 클래스에서 필드를 추가하고 확장할 수 있기 때문에 protected 접근 제어자를
	// 통해 접근할 수 있도록 하는 것이 관례다.
	
	public String getOp() {
		return op;
	}
	
	public Date getEdate() {
		return edate;
	}

	public void setEdate(Date edate) {
		this.edate = edate;
	}

	public Date getEdu_Date() {
		return edu_Date;
	}

	public void setEdu_Date(Date edu_Date) {
		this.edu_Date = edu_Date;
		this.yyyyMMdd1 = edu_Date.toString();
	}

	public Date getEdu_Date2() {
		return edu_Date2;
	}

	public void setEdu_Date2(Date edu_Date2) {
		this.edu_Date2 = edu_Date2;
		this.yyyyMMdd2 = edu_Date2.toString();
	}

	public String getYyyyMMdd1() {
		return yyyyMMdd1;
	}

	public void setYyyyMMdd1(String yyyyMMdd1) {
		this.setEdu_Date(Date.valueOf(yyyyMMdd1));
	}

	public String getYyyyMMdd2() {
		return yyyyMMdd2;
	}

	public void setYyyyMMdd2(String yyyyMMdd2) {
		this.setEdu_Date2(Date.valueOf(yyyyMMdd2));
	}

	public String getSub() {
		return sub;
	}

	public void setSub(String sub) {
		this.sub = sub;
	}

	public int getEno() {
		return eno;
	}

	public void setEno(int eno) {
		this.eno = eno;
	}

	public int getSno() {
		return sno;
	}

	public void setSno(int sno) {
		this.sno = sno;
	}

	public void setOp(String op) {
		this.op = op;
	}

	public int getDev1() {
		return dev1;
	}

	public void setDev1(int dev1) {
		this.dev1 = dev1;
	}

	public int getDev2() {
		return dev2;
	}

	public void setDev2(int dev2) {
		this.dev2 = dev2;
	}

	public int getMng_eval1() {
		return mng_eval1;
	}

	public void setMng_eval1(int mng_eval1) {
		this.mng_eval1 = mng_eval1;
	}

	public int getMng_eval2() {
		return mng_eval2;
	}

	public void setMng_eval2(int mng_eval2) {
		this.mng_eval2 = mng_eval2;
	}

	public int getCur_eval1() {
		return cur_eval1;
	}

	public void setCur_eval1(int cur_eval1) {
		this.cur_eval1 = cur_eval1;
	}

	public int getCur_eval2() {
		return cur_eval2;
	}

	public void setCur_eval2(int cur_eval2) {
		this.cur_eval2 = cur_eval2;
	}

	public int getCur_eval3() {
		return cur_eval3;
	}

	public void setCur_eval3(int cur_eval3) {
		this.cur_eval3 = cur_eval3;
	}

	public int getCur_eval4() {
		return cur_eval4;
	}

	public void setCur_eval4(int cur_eval4) {
		this.cur_eval4 = cur_eval4;
	}

	public int getTch_eval1() {
		return tch_eval1;
	}

	public void setTch_eval1(int tch_eval1) {
		this.tch_eval1 = tch_eval1;
	}

	public int getTch_eval2() {
		return tch_eval2;
	}

	public void setTch_eval2(int tch_eval2) {
		this.tch_eval2 = tch_eval2;
	}

	public int getTch_eval3() {
		return tch_eval3;
	}

	public void setTch_eval3(int tch_eval3) {
		this.tch_eval3 = tch_eval3;
	}

	public int getTch_eval4() {
		return tch_eval4;
	}

	public void setTch_eval4(int tch_eval4) {
		this.tch_eval4 = tch_eval4;
	}

	public int getSub_eval1() {
		return sub_eval1;
	}

	public void setSub_eval1(int sub_eval1) {
		this.sub_eval1 = sub_eval1;
	}

	public int getSub_eval2() {
		return sub_eval2;
	}

	public void setSub_eval2(int sub_eval2) {
		this.sub_eval2 = sub_eval2;
	}

	public int getSub_eval3() {
		return sub_eval3;
	}

	public void setSub_eval3(int sub_eval3) {
		this.sub_eval3 = sub_eval3;
	}

	public String getCur_name() {
		return cur_name;
	}

	public void setCur_name(String cur_name) {
		this.cur_name = cur_name;
	}

}
