DROP TABLE ENEM_ESCOLA CASCADE CONSTRAINTS;
DROP TABLE ESCOLA CASCADE CONSTRAINTS;
DROP TABLE MUNICIPIO CASCADE CONSTRAINTS;
DROP TABLE EXEMPLO CASCADE CONSTRAINTS;

CREATE TABLE isabelleo.enem_escola (
    enem_id                  INTEGER NOT NULL,
    nome_escola              NVARCHAR2(120) NOT NULL,
    nu_participantes         INTEGER,
    nu_participantes_espec   INTEGER,
    nu_media_cn              NUMBER,
    nu_media_ch              NUMBER,
    nu_media_lp              NUMBER,
    nu_media_mt              NUMBER,
    nu_media_redacao         NUMBER
)
        PCTFREE 10 PCTUSED 40 TABLESPACE samples LOGGING
            STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
    NO INMEMORY;

CREATE UNIQUE INDEX isabelleo.enem_escola_pk ON
    isabelleo.enem_escola (
        enem_id
    ASC,
        nome_escola
    ASC )
        TABLESPACE samples PCTFREE 10
            STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE isabelleo.enem_escola ADD CONSTRAINT enem_escola_pk PRIMARY KEY ( enem_id )
    USING INDEX isabelleo.enem_escola_pk;

CREATE TABLE isabelleo.escola (
    escola_id     INTEGER NOT NULL,
    nome_escola   NVARCHAR2(120) NOT NULL,
    mun_id        INTEGER NOT NULL
)
        PCTFREE 10 PCTUSED 40 TABLESPACE samples LOGGING
            STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
    NO INMEMORY;

CREATE UNIQUE INDEX isabelleo.escola_pk ON
    isabelleo.escola ( escola_id ASC )
        TABLESPACE samples PCTFREE 10
            STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE isabelleo.escola ADD CONSTRAINT escola_pk PRIMARY KEY ( nome_escola )
    USING INDEX;

CREATE TABLE isabelleo.municipio (
    mun_id   INTEGER NOT NULL,
    nome     VARCHAR2(120 CHAR) NOT NULL,
    uf       VARCHAR2(120 CHAR) NOT NULL
)
        PCTFREE 10 PCTUSED 40 TABLESPACE samples LOGGING
            STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
    NO INMEMORY;

CREATE UNIQUE INDEX isabelleo.mun_pk ON
    isabelleo.municipio ( mun_id ASC )
        TABLESPACE samples PCTFREE 10
            STORAGE ( PCTINCREASE 0 MINEXTENTS 1 MAXEXTENTS UNLIMITED FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT )
        LOGGING;

ALTER TABLE isabelleo.municipio ADD CONSTRAINT mun_pk PRIMARY KEY ( mun_id )
    USING INDEX isabelleo.mun_pk;

ALTER TABLE isabelleo.enem_escola ADD CONSTRAINT enem_escola_escola_fk FOREIGN KEY ( nome_escola )
    REFERENCES isabelleo.escola ( nome_escola )
NOT DEFERRABLE;

ALTER TABLE isabelleo.escola ADD CONSTRAINT mun_id_fk FOREIGN KEY ( mun_id )
    REFERENCES isabelleo.municipio ( mun_id )
NOT DEFERRABLE;