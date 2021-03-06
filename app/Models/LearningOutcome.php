<?php

/**
 * Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup geliştirilen bütün kaynak kodlar
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
 * Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
 */

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

/**
 * Öğrenme çıktıları ya da kazanımlar sınıfı
 * Class LearningOutcome
 * @package App\Models
 */
class LearningOutcome extends Model
{
    protected $fillable = [
        "branch_id",
        "class_level",
        "code", "content",
        "description"
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class, "branch_id", "id");
    }
}
