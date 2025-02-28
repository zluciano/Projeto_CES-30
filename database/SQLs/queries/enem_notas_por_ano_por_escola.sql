SELECT ENEM_ESCOLA.ENEM_ID "Ano", ENEM_ESCOLA.NU_MATRICULAS, ENEM_ESCOLA.NU_PARTICIPANTES, 
    ENEM_ESCOLA.NUM_PARTICIPANTES_ESPEC, ENEM_ESCOLA.NU_MEDIA_CN, ENEM_ESCOLA.NU_MEDIA_CH, 
    ENEM_ESCOLA.NU_MEDIA_LP, ENEM_ESCOLA.NU_MEDIA_MT, ENEM_ESCOLA.NU_MEDIA_REDACAO
FROM ENEM_ESCOLA
JOIN ESCOLA
    ON ENEM_ESCOLA.ESCOLA_ID = ESCOLA.ESCOLA_ID
WHERE ESCOLA.NOME_ESCOLA = "Poliedro"
ORDER BY ENEM_ESCOLA.ENEM_ID;
