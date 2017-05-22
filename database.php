<?php

class  Boteljon
{
    private static $userInstance = null;

    private $dbh;

    private function __construct($server, $username, $password, $database)
    {
        try {
            $this->dbh = new PDO("mysql:host=$server; dbname=$database", $username, $password);
            //Bij error: exception opwerpen
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }

    public static function getUserInstance($server, $username, $password, $database)
    {
        if (is_null(self::$userInstance)) {
            self::$userInstance = new Boteljon($server, $username, $password, $database);
        }
        return self::$userInstance;
    }

    public function closeDB()
    {
        $dbh = null;
    }

    public function getFestivals()
    {
        $sql = "SELECT * FROM festivals ORDER BY festival_id";
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute();
        $festivalObj = $stmt->fetchAll(PDO::FETCH_OBJ);

        return $festivalObj;
    }
    
    public function getPackets()
    {
        $sql = "SELECT * FROM packets ORDER BY packet_id";
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute();
        $packetObj = $stmt->fetchAll(PDO::FETCH_OBJ);
        
        return $packetObj;
    }
    
    public function getPacketById($id)
    {
        $sql = "SELECT * FROM packets WHERE packet_id = :id";
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        
        $packetObj = $stmt->fetchAll(PDO::FETCH_OBJ);

        return $packetObj;
    }
    
    public function createToken()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $token = 'CSRF_TOKEN_';

        for ($i = 0; $i < 64; $i++)
        {
            $token .= $characters[mt_rand(0, strlen($characters) - 1)];
        }
        try{


            $sql = "INSERT INTO tokens(token_id,token)
					VALUES(NULL,:token)";
            $stmt = $this->dbh->prepare($sql);
            $stmt-> bindParam(":token", $token);
            $stmt->execute();

        }catch(PDOException $e){

            die($e->getMessage());

        }
        return $token;
    }
}

?>