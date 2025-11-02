
const DEFAULT_RESULT = {
  keyword: "hospital",
  placeType: "hospital",
  title: "Nearby hospitals & urgent care centers",
  highlight: "General emergency and acute care",
};

const includesAny = (subject, keywords = []) =>
  keywords.some((keyword) => subject.includes(keyword));

export function deriveSpecialtySearch(conditions = [], specialtyHint = "") {
  const normalizedHint = (specialtyHint || "").toLowerCase();
  const conditionText = Array.isArray(conditions)
    ? conditions
        .map((condition) => condition?.name?.toLowerCase?.() ?? "")
        .filter(Boolean)
        .join(" ")
    : "";

  const joined = `${normalizedHint} ${conditionText}`.trim();
  if (!joined) {
    return DEFAULT_RESULT;
  }

  // 🦵 Musculoskeletal / Sports injuries
  if (
    includesAny(joined, [
      "tendonitis",
      "tendinitis",
      "sprain",
      "strain",
      "fracture",
      "ligament",
      "joint",
      "back pain",
      "muscle",
      "orthopedic",
      "physiotherapy",
    ])
  ) {
    return {
      keyword: "orthopedic clinic physical therapy",
      placeType: "physiotherapist",
      title: "Nearby orthopedic & physiotherapy centers",
      highlight: "For injuries, joint pain, and musculoskeletal issues",
    };
  }

  // 💨 Respiratory / ENT / Cold & cough
  if (
    includesAny(joined, [
      "asthma",
      "bronchitis",
      "cough",
      "sore throat",
      "sinus",
      "cold",
      "flu",
      "respiratory",
      "ent",
      "pulmonology",
    ])
  ) {
    return {
      keyword: "pulmonologist ENT clinic",
      placeType: "doctor",
      title: "Nearby ENT & respiratory specialists",
      highlight: "Ear, nose, throat, and breathing problems",
    };
  }

  // 💓 Cardiac issues
  if (
    includesAny(joined, [
      "chest pain",
      "heart",
      "hypertension",
      "blood pressure",
      "cardiology",
      "cardiologist",
    ])
  ) {
    return {
      keyword: "cardiologist",
      placeType: "doctor",
      title: "Nearby cardiology clinics",
      highlight: "Heart and blood pressure specialists",
    };
  }

  // 💧 Kidney & urinary
  if (
    includesAny(joined, [
      "urinary",
      "kidney",
      "bladder",
      "uti",
      "urology",
      "nephrology",
    ])
  ) {
    return {
      keyword: "urologist nephrologist",
      placeType: "doctor",
      title: "Nearby urology & kidney specialists",
      highlight: "For urinary or kidney-related conditions",
    };
  }

  // 🍽️ Digestive & abdominal
  if (
    includesAny(joined, [
      "stomach",
      "digestive",
      "diarrhea",
      "vomit",
      "constipation",
      "acid",
      "ulcer",
      "liver",
      "gastroenterology",
      "gi",
    ])
  ) {
    return {
      keyword: "gastroenterologist",
      placeType: "doctor",
      title: "Nearby gastroenterology clinics",
      highlight: "For stomach, digestion, or liver problems",
    };
  }

  // 🧠 Neurological
  if (
    includesAny(joined, [
      "migraine",
      "headache",
      "neuropathy",
      "seizure",
      "numbness",
      "paralysis",
      "tremor",
      "neurology",
      "neurologist",
    ])
  ) {
    return {
      keyword: "neurologist",
      placeType: "doctor",
      title: "Nearby neurology centers",
      highlight: "For migraines, nerve, or brain-related conditions",
    };
  }

  // 🩸 Diabetes / endocrine
  if (
    includesAny(joined, [
      "diabetes",
      "thyroid",
      "hormone",
      "endocrine",
      "endocrinology",
    ])
  ) {
    return {
      keyword: "endocrinologist diabetes clinic",
      placeType: "doctor",
      title: "Nearby endocrinology & diabetes clinics",
      highlight: "For thyroid and metabolic health",
    };
  }

  // 🦷 Dental
  if (
    includesAny(joined, ["tooth", "gum", "dental", "dentist", "dentistry"])
  ) {
    return {
      keyword: "dentist dental clinic",
      placeType: "dentist",
      title: "Nearby dental clinics",
      highlight: "Oral and dental care",
    };
  }

  // 👁️ Eye / vision
  if (
    includesAny(joined, [
      "eye",
      "vision",
      "cataract",
      "red eye",
      "ophthalmology",
      "optometry",
    ])
  ) {
    return {
      keyword: "ophthalmologist optometrist eye clinic",
      placeType: "doctor",
      title: "Nearby eye care centers",
      highlight: "Eye specialists and vision clinics",
    };
  }

  // 🧴 Skin / dermatology
  if (
    includesAny(joined, [
      "rash",
      "acne",
      "eczema",
      "psoriasis",
      "itch",
      "dermatitis",
      "skin",
      "dermatology",
      "dermatologist",
    ])
  ) {
    return {
      keyword: "dermatologist skin clinic",
      placeType: "doctor",
      title: "Nearby dermatology clinics",
      highlight: "Skin, hair, and allergy specialists",
    };
  }

  // 🦵 Arthritis / gout / chronic joint pain
  if (
    includesAny(joined, [
      "arthritis",
      "gout",
      "osteoarthritis",
      "rheumatology",
      "rheumatologist",
    ])
  ) {
    return {
      keyword: "rheumatologist",
      placeType: "doctor",
      title: "Nearby arthritis & rheumatology clinics",
      highlight: "For gout and chronic joint pain",
    };
  }

  // 🤒 Infection / fever
  if (
    includesAny(joined, [
      "infection",
      "fever",
      "infectious disease",
      "infectious",
    ])
  ) {
    return {
      keyword: "urgent care clinic",
      placeType: "hospital",
      title: "Nearby urgent care centers",
      highlight: "For general infections and fevers",
    };
  }

  // 🧠 Mental health
  if (
    includesAny(joined, [
      "anxiety",
      "depression",
      "stress",
      "panic",
      "mental",
      "psychiatry",
      "psychology",
      "behavioral health",
    ])
  ) {
    return {
      keyword: "psychologist psychiatrist mental health clinic",
      placeType: "doctor",
      title: "Nearby mental health support centers",
      highlight: "Counseling, therapy, and psychiatry",
    };
  }

  // 🩹 Wound care / trauma
  if (
    includesAny(joined, [
      "wound",
      "cut",
      "burn",
      "trauma",
      "injury",
      "urgent care",
    ])
  ) {
    return {
      keyword: "urgent care wound clinic",
      placeType: "hospital",
      title: "Nearby urgent care or wound treatment centers",
      highlight: "Immediate treatment for minor injuries",
    };
  }

  // 🧍 Reproductive / gynecology
  if (
    includesAny(joined, [
      "pregnancy",
      "menstrual",
      "fertility",
      "period",
      "gynecology",
      "obgyn",
      "women's health",
    ])
  ) {
    return {
      keyword: "gynecologist obstetrician women health clinic",
      placeType: "doctor",
      title: "Nearby women’s health & OB-GYN clinics",
      highlight: "Reproductive and maternal care",
    };
  }

  // 🧒 Pediatrics / child
  if (
    includesAny(joined, [
      "child",
      "pediatric",
      "infant",
      "children's hospital",
      "pediatrics",
    ])
  ) {
    return {
      keyword: "pediatric clinic",
      placeType: "doctor",
      title: "Nearby pediatric care centers",
      highlight: "For child and infant healthcare",
    };
  }

  // 👂 Ear / hearing
  if (
    includesAny(joined, [
      "ear",
      "hearing",
      "tinnitus",
      "audiology",
      "otology",
      "ent",
    ])
  ) {
    return {
      keyword: "ENT clinic audiologist",
      placeType: "doctor",
      title: "Nearby ENT & audiology centers",
      highlight: "Ear, hearing, and sinus specialists",
    };
  }

  // 🧍‍♂️ Male health / prostate
  if (
    includesAny(joined, [
      "prostate",
      "erectile",
      "male",
      "men's health",
      "andrology",
    ])
  ) {
    return {
      keyword: "urologist men health clinic",
      placeType: "doctor",
      title: "Nearby urology & men's health clinics",
      highlight: "Prostate and men's health specialists",
    };
  }

  // 👶 Pregnancy care
  if (
    includesAny(joined, ["prenatal", "obstetric", "obstetrics", "maternal"])
  ) {
    return {
      keyword: "obstetrician gynecologist",
      placeType: "doctor",
      title: "Nearby prenatal & obstetrics clinics",
      highlight: "Pregnancy and maternal care",
    };
  }

  // 🦠 Immunology / allergies
  if (
    includesAny(joined, [
      "allergy",
      "immune",
      "immunology",
      "immunologist",
      "asthma",
    ])
  ) {
    return {
      keyword: "allergy specialist immunologist",
      placeType: "doctor",
      title: "Nearby allergy & immunology clinics",
      highlight: "Allergy and immune system treatment",
    };
  }

  // 💉 Infection or unknown condition fallback
  return {
    keyword: "hospital clinic",
    placeType: "hospital",
    title: "Nearby hospitals & medical clinics",
    highlight: "General and specialized healthcare",
  };
}
