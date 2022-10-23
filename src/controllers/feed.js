const db = require("../util/db");

exports.Verificacion = (req, res, next) => {
  var row = [];
  console.log(req.body);
  db.query(
    "SELECT Token, Identificacion, Fecha_Hora, Token_Activo FROM `time_att_db`.`Portal_App_token` WHERE `Token` = ? AND Token_Activo = 1 ;",
    [req.body.Token]
  )
    .then(([rows, fieldData]) => {
      row = rows;
    })
    .catch((e) => {
      console.log("handle error here: ", e.message);
    });

  setTimeout(() => {
    if (!row[0]) {
      res.status(200).json("no");
      console.log("no");
    } else {
      res.status(200).json("si");
      console.log("si");
    }
  }, 1000); // se establece un timeout de 1 segundo en el que si se cumple un segundo y no hay llegado datos se manda un mensaje de no hay datos
};


exports.Registro = (req, res, next) => {
  var row = [];
  var rowInsert = [];
  console.log(req.body);
  db.query(
    "SELECT empleado.Nombres, empleado.Apellidos, empresa.Nombre FROM `time_att_db`.`Portal_App_empleado` as empleado inner join `Portal_App_empresa` as empresa on empleado.Cod_Empresa_id = empresa.Cod_Empresa where empleado.`Identificacion` =? and empleado.`Cod_Empresa_id` =?;",
    [req.body.ID, req.body.Empresa]
  )
    .then(([rows, fieldData]) => {
      row = rows;

    })
    .catch((e) => {
      console.log("handle error here: ", e.message);
    });

  db.query(
    "INSERT INTO `time_att_db`.`Portal_App_token` (Token, Identificacion, Fecha_Hora, Token_Activo) VALUES(?, ?, NOW(), 1);",
    [req.body.Token, req.body.ID]
  )
    .then(([rows, fieldData]) => {
      rowInsert = rows;

    })
    .catch((e) => {
      console.log("handle error here: ", e.message);
    });

  setTimeout(() => {
    console.log(row[0]);
    if (!row[0]) {
      res.status(200).json("No se puede registrar");
    } else {
      res.status(200).json("Registrado");
    }
  }, 1000); // se establece un timeout de 1 segundo en el que si se cumple un segundo y no hay llegado datos se manda un mensaje de no hay datos
};


exports.InicioMarcacion = (req, res, next) => {
  var iniciomarcacion = "";
  var rowInfo = [];
  var rowRegistros = [];
  var contador = 0;
  console.log(req.body);
  db.query(
    "SELECT Token.Identificacion, Empleado.Nombres, Empleado.Apellidos ,Empresa.Nombre,Empresa.Cod_Empresa FROM `time_att_db`.`Portal_App_token` as Token inner join `time_att_db`.`Portal_App_empleado` as Empleado on Token.Identificacion = Empleado.Identificacion inner join `time_att_db`.`Portal_App_empresa` as Empresa on Empleado.Cod_Empresa_id = Empresa.Cod_Empresa where Token.`Token` = ?;",
    [req.body.Token]
  )
    .then(([row, fieldData]) => {
      rowInfo=row;
      if (!row[0]) {
        iniciomarcacion = 'error'
      } else {
        db.query("SELECT CASE WHEN Reg_Marcacion_1 = NULL THEN NULL ELSE DATE(Reg_Marcacion_1) END AS DateReg1, CASE WHEN Reg_Marcacion_1 = NULL THEN NULL ELSE TIME(Reg_Marcacion_1) END AS TimeReg1, CASE WHEN Reg_Marcacion_2 = NULL THEN NULL ELSE DATE(Reg_Marcacion_2) END AS DateReg2, CASE WHEN Reg_Marcacion_2 = NULL THEN NULL ELSE TIME(Reg_Marcacion_2) END AS TimeReg2, CASE WHEN Reg_Marcacion_3 = NULL THEN NULL ELSE DATE(Reg_Marcacion_3) END AS DateReg3, CASE WHEN Reg_Marcacion_3 = NULL THEN NULL ELSE TIME(Reg_Marcacion_3) END AS TimeReg3, CASE WHEN Reg_Marcacion_4 = NULL THEN NULL ELSE DATE(Reg_Marcacion_4) END AS DateReg4, CASE WHEN Reg_Marcacion_4 = NULL THEN NULL ELSE TIME(Reg_Marcacion_4) END AS TimeReg4 FROM `time_att_db`.`Portal_App_marcacion` WHERE  `Identificacion_id`=? order by Id_Marcacion desc LIMIT 10;",
          [row[0].Identificacion]
        )
          .then(([rows, fieldData]) => {
            if (!rows[0]) {
              rowRegistros = [];
            } else {
              rows.map((entry, index) => {
                if (entry.DateReg4 !== null) {
                  if (contador < 10) {
                    rowRegistros.push([(entry.DateReg4).toString().slice(4,15), (entry.TimeReg4).slice(0,8)]);
                    contador = contador + 1;
                  }
                  if (entry.DateReg3 !== null) {
                    if (contador < 10) {
                      rowRegistros.push([(entry.DateReg3).toString().slice(4,15), (entry.TimeReg3).slice(0,8)]);
                      contador = contador + 1;
                    }
                  }
                  if (entry.DateReg2 !== null) {
                    if (contador < 10) {
                      rowRegistros.push([(entry.DateReg2).toString().slice(4,15), (entry.TimeReg2).slice(0,8)]);
                      contador = contador + 1;
                    }
                  }
                  if (entry.DateReg1 !== null) {
                    if (contador < 10) {
                      rowRegistros.push([(entry.DateReg1).toString().slice(4,15), (entry.TimeReg1).slice(0,8)]);
                      contador = contador + 1;
                    }
                  }
                } else {
                  if (entry.DateReg3 !== null) {
                    if (contador < 10) {
                      rowRegistros.push([(entry.DateReg3).toString().slice(4,15), (entry.TimeReg3).slice(0,8)]);
                      contador = contador + 1;
                    }
                    if (entry.DateReg2 !== null) {
                      if (contador < 10) {
                        rowRegistros.push([(entry.DateReg2).toString().slice(4,15), (entry.TimeReg2).slice(0,8)]);
                        contador = contador + 1;
                      }
                    }
                    if (entry.DateReg1 !== null) {
                      if (contador < 10) {
                        rowRegistros.push([(entry.DateReg1).toString().slice(4,15), (entry.TimeReg1).slice(0,8)]);
                        contador = contador + 1;
                      }
                    }
                  } else {
                    if (entry.DateReg2 !== null) {
                      if (contador < 10) {
                        rowRegistros.push([(entry.DateReg2).toString().slice(4,15), (entry.TimeReg2).slice(0,8)]);
                        contador = contador + 1;
                      }
                      if (entry.DateReg1 !== null) {
                        if (contador < 10) {
                          rowRegistros.push([(entry.DateReg1).toString().slice(4,15), (entry.TimeReg1).slice(0,8)]);
                          contador = contador + 1;
                        }
                      }
                    } else {
                      if (contador < 10) {
                        rowRegistros.push([(entry.DateReg1).toString().slice(4,15), (entry.TimeReg1).slice(0,8)]);
                        contador = contador + 1;
                      }
                    }
                  }
                }
              })
            }
          })
          .catch((e) => {
            console.log("handle error here: ", e.message);
          });
      }
    })
    .catch((e) => {
      console.log("handle error here: ", e.message);
    });

  setTimeout(() => {
    if (iniciomarcacion==="error") {
      res.status(200).json("Error");
    } else {
      console.log(rowRegistros);
      res.status(200).json([rowInfo[0],rowRegistros]);
    }
  }, 1000); // se establece un timeout de 1 segundo en el que si se cumple un segundo y no hay llegado datos se manda un mensaje de no hay datos
};


exports.Marcacion = (req, res, next) => {
  const RT = 6378;
  var row = [];
  var accion = "";
  var Marcacion = "";
  console.log(req.body);
  db.query(
    "SELECT PuntoMarc.Nombre_Pto_Marcac ,PuntoMarc.Id_Punto_Marc,PuntoMarc.Latitud,PuntoMarc.Longitud,PuntoMarc.Distancia FROM `time_att_db`.`Portal_App_proyecto` as Proyecto inner join `time_att_db`.`Portal_App_punto_de_marcacion` as PuntoMarc on Proyecto.`Id_Proyecto` = PuntoMarc.`Id_Proyecto_id` where Proyecto.`Cod_Empresa_id` =? and Proyecto.`IsActive` =1;",
    [req.body.CodEmpresa]
  )
    .then(([rows, fieldData]) => {
      row = rows;
      if (row[0]) {
        row.map((entry, index) => {
          console.log(entry.Id_Punto_Marc);
          let deltaLat = Math.abs(entry.Latitud - req.body.Latitud);
          let deltalong = Math.abs(entry.Longitud - req.body.Longitud);
          console.log(deltaLat + "*****" + deltalong);
          let a1 = (Math.sin(deltaLat / 2));
          let a2 = a1 * a1;
          let a3 = (Math.sin(deltalong / 2));
          let a4 = a3 * a3;
          let a = a2 + (Math.cos(req.body.Latitud) * Math.cos(entry.Latitud) * a4);
          let raiz1 = Math.sqrt(a);
          let raiz2 = Math.sqrt(1 - a);
          let c = 2 * Math.atan2(raiz1, raiz2);
          let d = (RT * c * Math.PI * 1000) / 180;
          console.log(d);
          if (d <= entry.Distancia) {
            Marcacion = entry.Nombre_Pto_Marcac;
            //Comprobacion de si hay registro en el dia
            db.query(
              "SELECT Id_Marcacion,TIMESTAMPDIFF(MINUTE, Reg_Marcacion_1,NOW()) as dif1, CASE WHEN Reg_Marcacion_2= NULL THEN NULL ELSE TIMESTAMPDIFF(MINUTE, Reg_Marcacion_2,NOW()) END AS dif2, CASE WHEN Reg_Marcacion_3= NULL THEN NULL ELSE TIMESTAMPDIFF(MINUTE, Reg_Marcacion_3,NOW()) END AS dif3, CASE WHEN Reg_Marcacion_4= NULL THEN NULL ELSE TIMESTAMPDIFF(MINUTE, Reg_Marcacion_4,NOW()) END AS dif4 FROM  `time_att_db`.`Portal_App_marcacion` where `Identificacion_id` =? order by Id_Marcacion desc limit 1;",
              [req.body.ID]
            )
              .then(([rows, fieldData]) => {
                if (rows[0]) {
                  console.log("hay marcacion hecha al usuario");
                  if (rows[0].dif4 !== null) {
                    console.log("marcacion 4 existe");
                    if (rows[0].dif4 >= 720) {
                      console.log("nueva marcacion debido a que la 4 ya paso 12 horas");
                      db.query(
                        "INSERT INTO `time_att_db`.`Portal_App_marcacion` (Reg_Marcacion_1, Reg_Marcacion_2, Reg_Marcacion_3, Reg_Marcacion_4, Id_Punto_Marc_1_id, Id_Punto_Marc_2_id, Id_Punto_Marc_3_id, Id_Punto_Marc_4_id, Identificacion_id) VALUES(NOW(), NULL, NULL, NULL, ?, NULL, NULL, NULL, ?);",
                        [entry.Id_Punto_Marc, req.body.ID]
                      )
                        .then(([rows, fieldData]) => {
                          accion = "insercion de nuevo registro";
                        })
                        .catch((e) => {
                          console.log("handle error here insercion: ", e.message);
                        });
                    }
                  } else {
                    console.log("marcacion 4 no existe");
                    if (rows[0].dif3 !== null) {
                      console.log("marcacion 3 existe");
                      if (rows[0].dif3 > 5 && rows[0].dif3 < 720) {
                        console.log("marcacion 4 agregada");
                        db.query(
                          "UPDATE`time_att_db`.`Portal_App_marcacion` SET Reg_Marcacion_4 = NOW(), `Id_Punto_Marc_4_id` =? WHERE `Id_Marcacion` =?;",
                          [entry.Id_Punto_Marc, rows[0].Id_Marcacion]
                        )
                          .then(([rows, fieldData]) => {
                            accion = "insercion de nuevo registro";
                          })
                          .catch((e) => {
                            console.log("handle error here insercion: ", e.message);
                          });
                      } else if (rows[0].dif3 > 720) {
                        console.log("nueva marcacion debido a que la 3 ya paso 12 horas");
                        db.query(
                          "INSERT INTO `time_att_db`.`Portal_App_marcacion` (Reg_Marcacion_1, Reg_Marcacion_2, Reg_Marcacion_3, Reg_Marcacion_4, Id_Punto_Marc_1_id, Id_Punto_Marc_2_id, Id_Punto_Marc_3_id, Id_Punto_Marc_4_id, Identificacion_id) VALUES(NOW(), NULL, NULL, NULL, ?, NULL, NULL, NULL, ?);",
                          [entry.Id_Punto_Marc, req.body.ID]
                        )
                          .then(([rows, fieldData]) => {
                            accion = "insercion de nuevo registro";
                          })
                          .catch((e) => {
                            console.log("handle error here insercion: ", e.message);
                          });
                      }
                    } else {
                      if (rows[0].dif2 !== null) {
                        console.log("marcacion 2 existe");
                        if (rows[0].dif2 > 5 && rows[0].dif2 < 720) {
                          console.log("marcacion 3 agregada");
                          db.query(
                            "UPDATE`time_att_db`.`Portal_App_marcacion` SET Reg_Marcacion_3 = NOW(), `Id_Punto_Marc_3_id` =? WHERE `Id_Marcacion` =?;",
                            [entry.Id_Punto_Marc, rows[0].Id_Marcacion]
                          )
                            .then(([rows, fieldData]) => {
                              accion = "insercion de nuevo registro";
                            })
                            .catch((e) => {
                              console.log("handle error here insercion: ", e.message);
                            });
                        } else if (rows[0].dif2 > 720) {
                          console.log("nueva marcacion debido a que la 2 ya paso 12 horas");
                          db.query(
                            "INSERT INTO `time_att_db`.`Portal_App_marcacion` (Reg_Marcacion_1, Reg_Marcacion_2, Reg_Marcacion_3, Reg_Marcacion_4, Id_Punto_Marc_1_id, Id_Punto_Marc_2_id, Id_Punto_Marc_3_id, Id_Punto_Marc_4_id, Identificacion_id) VALUES(NOW(), NULL, NULL, NULL, ?, NULL, NULL, NULL, ?);",
                            [entry.Id_Punto_Marc, req.body.ID]
                          )
                            .then(([rows, fieldData]) => {
                              accion = "insercion de nuevo registro";
                            })
                            .catch((e) => {
                              console.log("handle error here insercion: ", e.message);
                            });
                        }
                      } else {
                        if (rows[0].dif1 !== null) {
                          console.log("marcacion 1 existe");
                          if (rows[0].dif1 > 5 && rows[0].dif1 < 720) {
                            console.log("marcacion 2 agragada");
                            db.query(
                              "UPDATE`time_att_db`.`Portal_App_marcacion` SET Reg_Marcacion_2 = NOW(), `Id_Punto_Marc_2_id` =? WHERE `Id_Marcacion` =?;",
                              [entry.Id_Punto_Marc, rows[0].Id_Marcacion]
                            )
                              .then(([rows, fieldData]) => {
                                accion = "insercion de nuevo registro";
                              })
                              .catch((e) => {
                                console.log("handle error here insercion: ", e.message);
                              });
                          } else if (rows[0].dif1 > 720) {
                            console.log("nueva marcacion debido a que la 1 ya paso 12 horas");
                            db.query(
                              "INSERT INTO `time_att_db`.`Portal_App_marcacion` (Reg_Marcacion_1, Reg_Marcacion_2, Reg_Marcacion_3, Reg_Marcacion_4, Id_Punto_Marc_1_id, Id_Punto_Marc_2_id, Id_Punto_Marc_3_id, Id_Punto_Marc_4_id, Identificacion_id) VALUES(NOW(), NULL, NULL, NULL, ?, NULL, NULL, NULL, ?);",
                              [entry.Id_Punto_Marc, req.body.ID]
                            )
                              .then(([rows, fieldData]) => {
                                accion = "insercion de nuevo registro";
                              })
                              .catch((e) => {
                                console.log("handle error here insercion: ", e.message);
                              });
                          }
                        }
                      }
                    }

                  }
                } else {
                  db.query(
                    "INSERT INTO `time_att_db`.`Portal_App_marcacion` (Reg_Marcacion_1, Reg_Marcacion_2, Reg_Marcacion_3, Reg_Marcacion_4, Id_Punto_Marc_1_id, Id_Punto_Marc_2_id, Id_Punto_Marc_3_id, Id_Punto_Marc_4_id, Identificacion_id) VALUES(NOW(), NULL, NULL, NULL, ?, NULL, NULL, NULL, ?);",
                    [entry.Id_Punto_Marc, req.body.ID]
                  )
                    .then(([rows, fieldData]) => {
                      accion = "insercion de nuevo registro";
                    })
                    .catch((e) => {
                      console.log("handle error here insercion: ", e.message);
                    });
                }
              })
              .catch((e) => {
                console.log("handle error here: ", e.message);
              });
          }
        });
      } else {
        res.status(200).json("No hay punto de marcacion asociado");
      }
    })
    .catch((e) => {
      console.log("handle error here: ", e.message);
    });

  setTimeout(() => {
    if (accion === "insercion de nuevo registro") {
      console.log("completo ok");
      res.status(200).json({ Marcacion });
    } else {
      res.status(200).json("error");
      console.log("error");
    }
  }, 1000); // se establece un timeout de 1 segundo en el que si se cumple un segundo y no hay llegado datos se manda un mensaje de no hay datos
};


exports.Desactivacion = (req, res, next) => {
  var row = [];
  console.log(req.body);
  db.query(
    "UPDATE `time_att_db`.`Portal_App_token` SET `Token_Activo`=0 WHERE `Token`=?;",
    [req.body.Token]
  )
    .then(([rows, fieldData]) => {
      row = rows;
    })
    .catch((e) => {
      console.log("handle error here: ", e.message);
    });

  setTimeout(() => {
    if (!row[0]) {
      res.status(200).json("error");
    } else {
      res.status(200).json("actualizado");
    }
  }, 1000); // se establece un timeout de 1 segundo en el que si se cumple un segundo y no hay llegado datos se manda un mensaje de no hay datos
};

