const CONVERSION_MATRIX = {
    pdf: ["docx", "xlsx"],
    docx: ["pdf", "pptx"],
    pptx: ["pdf"],
    xlsx: ["pdf", "csv"],
  };
  
  function getAllowedTargets(inputType) {
    return CONVERSION_MATRIX[inputType] || [];
  }
  
  function isConversionAllowed(inputType, outputType) {
    return getAllowedTargets(inputType).includes(outputType);
  }
  
  module.exports = {
    CONVERSION_MATRIX,
    getAllowedTargets,
    isConversionAllowed,
  };